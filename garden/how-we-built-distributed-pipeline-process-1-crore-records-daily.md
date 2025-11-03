---
title: "How We Built a Distributed Pipeline to Process 1 Crore Records Daily"
date: "2025-11-03"
stage: "seedling"
tags:
  [
    "nestjs",
    "bullmq",
    "distributed-systems",
    "data-pipeline",
    "producer-worker",
    "typescript",
  ]
excerpt: "How we built a custom distributed pipeline to process 1 crore (10M+) real estate records daily with 99.9% reliability using NestJS, BullMQ, and the Producer-Worker pattern"
---

## The Challenge

How do you process millions of real estate records every day, transforming data from messy spreadsheets into a production-ready data warehouse, while ensuring zero data loss and maximum reliability?

Started with manual batch scripts, but faced:

- No visibility into failures
- Scaling bottlenecks with growing data
- No retry mechanism - lost records forever
- Required manual intervention

## The Solution Architecture

### Producer-Worker Pattern

```
┌──────────────┐    ┌──────────┐    ┌──────────────┐
│   Producer   │───>│  Queue   │───>│   Worker     │
│  (1 replica) │    │  (Redis) │    │(200 replicas)│
└──────────────┘    └──────────┘    └──────────────┘
```

**Why this pattern:**

- Separation of concerns: orchestration vs execution
- Horizontal scaling: add workers = more throughput
- Fault tolerance: worker failures isolated
- Automatic load balancing

## Key Technical Decisions

### Memory-Efficient Streaming

Using async generators instead of loading entire tables:

```typescript
async *streamBatches(table: string, batchSize: number) {
  let offset = 0;
  const chunkSize = 10000;

  while (true) {
    const rows = await this.db.query(
      `SELECT * FROM ${table} LIMIT ${chunkSize} OFFSET ${offset}`
    );

    if (rows.length === 0) break;

    for (let i = 0; i < rows.length; i += batchSize) {
      yield rows.slice(i, i + batchSize);
    }

    offset += chunkSize;
  }
}
```

**Result:** 8x memory reduction (4GB → 500MB)

### Row-Level Error Isolation

Failed rows don't kill entire batch:

```typescript
for (const row of rows) {
  try {
    await processRow(row);
  } catch (error) {
    await dlq.add("failed-row", { row, error });
    // Continue with next row
  }
}
```

**Result:** 99% success rate even with bad data

### Parallel Queue Writes with Memory Guards

Control parallelism to prevent overflow:

```typescript
const q = async.queue(async (task) => {
  await this.etlQueue.add(task.name, task.data);
}, MAX_PARALLEL);

for await (const batch of stream) {
  q.push(createJob(batch));

  if (q.length() > MEMORY_GUARD) {
    await q.drain(); // Pause and let it catch up
  }
}
```

**Result:** 3.5x faster Redis writes

### Automatic Worker Scaling

Dynamic scaling based on queue depth:

```typescript
// Monitor queue metrics every 30 seconds
setInterval(async () => {
  const queue = new Queue("etl", { connection: redis });
  const waiting = await queue.getWaitingCount();
  const active = await queue.getActiveCount();

  const queueDepth = waiting + active;
  const currentWorkers = await getWorkerCount();

  // Scale up: add workers when queue is backing up
  if (queueDepth > 10000 && currentWorkers < 200) {
    const targetWorkers = Math.min(Math.ceil(queueDepth / 100), 200);
    await scaleWorkers(targetWorkers);
  }

  // Scale down: remove workers when queue is empty
  if (queueDepth < 100 && currentWorkers > 10) {
    await scaleWorkers(10); // Keep minimum 10 workers
  }
}, 30000);
```

**Scaling Strategy:**

- **Scale up**: 1 worker per 100 pending jobs (max 200)
- **Scale down**: Drop to 10 workers when queue < 100 jobs
- **Cost optimization**: Only pay for workers when needed
- **Response time**: 30-second polling interval

**Result:** 60% cost reduction during off-peak hours

## Production Metrics

- **10M+ records** processed daily
- **30-45 minutes** total pipeline time
- **99.9% success rate** with retry + DLQ
- **200 concurrent workers** at peak
- **Zero data loss** (DLQ catches all failures)

## Design Patterns Used

1. **Factory Pattern**: Create appropriate producer based on ETL type
2. **Strategy Pattern**: Select database repository at runtime
3. **Template Method**: Define algorithm skeleton in base class

## Critical Bug We Found

QueueEvents resource leak:

```typescript
// ❌ BEFORE: Memory leak
const queueEvents = new QueueEvents('etl', {...});
queueEvents.on('drained', callback);
// Never closed! 14 tables = 14 hanging connections

// ✅ AFTER: Proper cleanup
try {
  await new Promise((resolve) => {
    queueEvents.on('drained', resolve);
  });
} finally {
  queueEvents.removeAllListeners();
  await queueEvents.close(); // Critical!
}
```

## Next Steps to Develop This Note

- [ ] Add complete code examples for producer service
- [ ] Document worker configuration and scaling strategy
- [ ] Add monitoring and observability setup
- [ ] Create architecture diagrams
- [ ] Document retry strategy and DLQ handling
- [ ] Add performance benchmarks and optimization tips
- [ ] Create open-source boilerplate repository

## Technology Stack

| Component  | Technology      | Purpose                 |
| ---------- | --------------- | ----------------------- |
| Framework  | NestJS          | DI, modularity          |
| Queue      | BullMQ + Redis  | Job distribution, retry |
| Databases  | MySQL + MongoDB | Source and destination  |
| Scaling    | Docker Compose  | 200 worker replicas     |
| Monitoring | Pino Logger     | Structured logging      |
