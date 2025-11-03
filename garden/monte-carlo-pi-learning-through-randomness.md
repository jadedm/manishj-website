---
title: "Monte Carlo Pi: Learning Through Randomness"
date: "2025-10-27"
stage: "seedling"
tags: ["monte-carlo", "distributed-computing", "rust", "webassembly", "algorithms", "mathematics"]
excerpt: "Exploring how chaos can reveal mathematical truth - using random dart throws to calculate π and learning the fundamentals of distributed computing"
---

## The Beautiful Paradox

How do you calculate something as precise as π using nothing but randomness? This is the essence of Monte Carlo methods—using chance to discover certainty.

## The Thought Experiment

Imagine a dartboard:
- A perfect circle inside a square
- You throw darts randomly at the square
- Some hit inside the circle, some outside
- The ratio reveals π

That&apos;s it. That&apos;s the entire method.

## The Geometry

**Setup:**
- Circle with radius 1 (area = π × 1² = π)
- Square with side 2 (area = 2 × 2 = 4)
- Ratio of areas = π/4

**The insight:** If we throw darts randomly, the ratio of hits should match the ratio of areas.

```
Darts in circle / Total darts ≈ π/4

Therefore: π ≈ 4 × (Darts in circle / Total darts)
```

## Why This Matters

This simple experiment teaches us something profound about computation:

**Parallelizable**: Every dart throw is independent. A thousand browsers can throw darts simultaneously without coordinating.

**Scalable accuracy**: Want more precision? Just throw more darts. The law of large numbers guarantees convergence.

**Verifiable**: We know what π should be. Perfect for testing a distributed system.

## The Implementation Path

### Step 1: Random Point Generation
```rust
// Generate random x, y coordinates between -1 and 1
let x = random_float();
let y = random_float();
```

### Step 2: Circle Test
```rust
// Check if point is inside the unit circle
if x * x + y * y <= 1.0 {
    inside_circle += 1;
}
```

### Step 3: Estimate
```rust
// After N iterations
let pi_estimate = 4.0 * (inside_circle as f64) / (total_points as f64);
```

That&apos;s the entire algorithm. Elegant in its simplicity.

## What You Learn

**With 100 darts:** π ≈ 3.2 (rough approximation)
**With 10,000 darts:** π ≈ 3.14 (getting closer)
**With 1,000,000 darts:** π ≈ 3.14159 (pretty accurate)
**With 1,000,000,000 darts:** π ≈ 3.141592653 (very accurate)

The convergence is slow (√N), but that&apos;s okay. We care about the principle: more compute = better results.

## Why It&apos;s Perfect for Distributed Computing

**Independent workers**: Browser A throws 1 million darts. Browser B throws 1 million darts. Both work independently.

**Simple aggregation**: Just combine the counts:
```
total_inside = browser_a_inside + browser_b_inside + ...
total_points = browser_a_points + browser_b_points + ...
pi = 4 * total_inside / total_points
```

**No data transfer**: Each browser just sends back two numbers: hits inside, total throws.

**Fault tolerant**: If a browser disconnects, we just use what we got. No corruption, no complex recovery.

## The Bigger Picture

Monte Carlo isn&apos;t just about π. It&apos;s a gateway to understanding:

- **Randomness as a tool** for deterministic problems
- **Statistical convergence** and the law of large numbers
- **Parallel computation** patterns
- **Error estimation** and confidence intervals

The same pattern applies to:
- Financial modeling (option pricing, risk analysis)
- Physics simulations (particle interactions, radiation)
- Machine learning (sampling, Bayesian inference)
- Optimization (genetic algorithms, simulated annealing)

## The First Experiment

Building this teaches you everything you need for distributed computing:

1. **Computation kernel** (the dart throwing logic)
2. **Work distribution** (how many darts per browser?)
3. **Result aggregation** (combining answers)
4. **Validation** (does our answer make sense?)

Once this works, you can distribute anything.

## Current Status

🌱 **Seedling stage**: Understanding the algorithm and implementation approach.

**Next milestone**: Write the Rust/WASM implementation and test in a single browser.

**Then**: Add multiple browsers, measure speedup, validate the distributed architecture.

## The Meta-Lesson

Sometimes the simplest problems teach the deepest lessons. Monte Carlo Pi isn&apos;t impressive because it calculates π (we have better methods for that). It&apos;s impressive because it shows how:

- Complex problems can be broken into simple pieces
- Random processes can solve deterministic problems
- Independent workers can coordinate without coordination
- Massive scale emerges from simple rules

This is the foundation. Everything else builds on this.

---

*Next: Actually implementing this in Rust + WebAssembly*
