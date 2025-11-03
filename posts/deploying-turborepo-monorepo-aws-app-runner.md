---
title: "Deploying a Turborepo Monorepo to AWS App Runner: A Complete Guide"
date: "2025-10-27"
excerpt: "From Amplify failures to App Runner success: Our journey deploying multiple Next.js frontends and a NestJS backend"
---

*From Amplify failures to App Runner success: Our journey deploying multiple Next.js frontends and a NestJS backend*

---

## The Challenge

We recently faced a common yet complex deployment scenario: deploying a **Turborepo monorepo** containing:
- **2 Next.js 15 frontend applications** (App Router)
- **1 NestJS backend API**
- **Shared UI component library**
- **Shared configuration packages** (ESLint, TypeScript)

The requirements were clear:
- All services should be deployed to **AWS**
- Custom domains for both frontends (non-www apex domains)
- HTTPS with automatic SSL certificate management
- Separate deployments for each app
- Cost-effective solution for production workloads

## Attempt #1: AWS Amplify

### Why Amplify?

AWS Amplify seemed like the perfect choice initially:
- **Built-in CI/CD** from GitHub
- **Automatic HTTPS** and SSL certificates
- **Global CDN** via CloudFront
- **Zero-config deployments** for Next.js
- **Cost:** ~$0.01 per build minute + $0.15/GB served

### The Setup

We configured Amplify with:
```yaml
version: 1
applications:
  - appRoot: apps/frontend-one
    frontend:
      phases:
        preBuild:
          commands:
            - npm install -g pnpm@9.0.0
            - pnpm install
        build:
          commands:
            - pnpm build --filter=frontend-one
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
```

### Why Amplify Failed

After **16+ build attempts**, we discovered critical issues:

#### 1. **Monorepo Build Complexity**
- Amplify struggled with Turborepo's workspace structure
- The `appRoot` configuration didn't properly isolate builds
- Dependencies from other workspace packages weren't resolved correctly

#### 2. **Build Context Issues**
```bash
Error: Cannot find module '@repo/ui'
Error: workspace dependency not found
```
Even with explicit `pnpm install` commands, Amplify couldn't resolve internal workspace dependencies properly.

#### 3. **Next.js Standalone Mode Incompatibility**
Our Next.js apps used `output: 'standalone'` for optimized Docker builds, but Amplify expected the full `.next` directory structure.

#### 4. **Limited Build Customization**
We needed to:
- Install dependencies at the **root** level
- Build shared packages **before** apps
- Copy workspace dependencies into the build artifact

Amplify's build process didn't provide enough control for these requirements.

### Debugging Process

We tried multiple approaches:
1. Different `appRoot` configurations
2. Custom build commands with workspace installs
3. Pre-building shared packages
4. Adjusting artifact paths
5. Using `pnpm deploy` to create isolated deployments

After 16 failed builds over several hours, we realized **Amplify wasn't designed for complex monorepo setups**.

---

## Attempt #2: AWS App Runner (Success!)

### Why App Runner?

AWS App Runner offered a different approach:
- **Docker-based deployments** (full control over build process)
- **Container registry integration** (ECR)
- **Automatic scaling** and load balancing
- **Built-in HTTPS** and custom domains
- **VPC support** for private resources

### The Architecture

```
┌─────────────────────────────────────────────┐
│           Turborepo Monorepo                │
│  ┌──────────────────────────────────────┐   │
│  │  apps/                               │   │
│  │    ├── frontend-one/                 │   │
│  │    │     └── Dockerfile              │   │
│  │    ├── frontend-two/                 │   │
│  │    │     └── Dockerfile              │   │
│  │    └── backend/                      │   │
│  │          └── Dockerfile              │   │
│  │  packages/                           │   │
│  │    ├── ui/                           │   │
│  │    ├── eslint-config/               │   │
│  │    └── typescript-config/           │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
              ↓
   ┌──────────────────────┐
   │  Multi-stage Docker  │
   │      Builds          │
   └──────────────────────┘
              ↓
   ┌──────────────────────┐
   │   AWS ECR Registry   │
   │  ├── frontend-one    │
   │  ├── frontend-two    │
   │  └── backend         │
   └──────────────────────┘
              ↓
   ┌──────────────────────┐
   │   AWS App Runner     │
   │  ├── Service 1       │
   │  ├── Service 2       │
   │  └── Service 3       │
   └──────────────────────┘
```

### Docker Multi-Stage Builds

The key to success was **multi-stage Docker builds** that properly handle the monorepo structure:

```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9.0.0

# Copy package files from entire monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/frontend-one/package.json ./apps/frontend-one/
COPY packages/ui/package.json ./packages/ui/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/

# Install all dependencies (including workspace packages)
RUN pnpm install --frozen-lockfile --prod=false

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm@9.0.0

# Copy dependencies from stage 1
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/frontend-one/node_modules ./apps/frontend-one/node_modules

# Copy entire source (needed for workspace dependencies)
COPY . .

# Build the specific app
WORKDIR /app/apps/frontend-one
RUN pnpm run build

# Stage 3: Runner (Production)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy Next.js standalone output
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend-one/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend-one/.next/static ./apps/frontend-one/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend-one/public ./apps/frontend-one/public

USER nextjs

EXPOSE 3000

CMD ["node", "apps/frontend-one/server.js"]
```

### Building and Pushing Images

```bash
# Build for linux/amd64 (required for AWS)
docker buildx build \
  --platform linux/amd64 \
  -f apps/frontend-one/Dockerfile \
  -t frontend-one:latest \
  . --load

# Tag for ECR
docker tag frontend-one:latest \
  <account-id>.dkr.ecr.ap-south-1.amazonaws.com/frontend-one:latest

# Authenticate with ECR
aws ecr get-login-password --region ap-south-1 | \
  docker login --username AWS --password-stdin \
  <account-id>.dkr.ecr.ap-south-1.amazonaws.com

# Push to ECR
docker push <account-id>.dkr.ecr.ap-south-1.amazonaws.com/frontend-one:latest
```

### Terraform Configuration

We used Terraform to manage App Runner services:

```hcl
resource "aws_apprunner_service" "frontend" {
  service_name = "frontend-one-production"

  source_configuration {
    image_repository {
      image_configuration {
        port = 3000

        runtime_environment_variables = {
          NODE_ENV           = "production"
          PORT               = "3000"
          HOSTNAME           = "0.0.0.0"  # Critical for App Runner!
          NEXT_PUBLIC_API_URL = "https://api.example.com"
          NEXT_TELEMETRY_DISABLED = "1"
        }
      }

      image_identifier      = "${var.ecr_registry}/frontend-one:latest"
      image_repository_type = "ECR"
    }

    authentication_configuration {
      access_role_arn = aws_iam_role.apprunner_ecr_access.arn
    }

    auto_deployments_enabled = false
  }

  instance_configuration {
    cpu    = "1024"  # 1 vCPU
    memory = "2048"  # 2 GB
    instance_role_arn = aws_iam_role.apprunner_instance.arn
  }

  health_check_configuration {
    protocol            = "HTTP"
    path                = "/"
    interval            = 20
    timeout             = 10
    healthy_threshold   = 1
    unhealthy_threshold = 10
  }

  auto_scaling_configuration_arn = aws_apprunner_auto_scaling_configuration_version.frontend.arn
}

resource "aws_apprunner_auto_scaling_configuration_version" "frontend" {
  auto_scaling_configuration_name = "frontend-asg-prod"

  max_concurrency = 100
  max_size        = 10
  min_size        = 1
}
```

---

## Challenge #1: Health Check Failures

### The Problem

After deploying, services immediately failed with:
```
CREATE_FAILED: Health check failed on protocol HTTP [Path: '/'], [Port: '3000']
```

Yet when testing locally:
```bash
docker run -p 3000:3000 frontend-one:latest
curl http://localhost:3000  # Works perfectly!
```

### Root Cause

Next.js standalone mode by default binds to `127.0.0.1` (localhost only), but App Runner health checks come from the internal AWS network.

### The Fix

Add `HOSTNAME=0.0.0.0` to environment variables:
```hcl
runtime_environment_variables = {
  HOSTNAME = "0.0.0.0"  # Bind to all interfaces
  PORT     = "3000"
}
```

### Debugging Process

1. **Checked CloudWatch logs:**
   ```bash
   aws logs tail /aws/apprunner/service-name/application --region ap-south-1
   ```
   Logs showed: `Ready in 161ms` - app was starting successfully!

2. **Tested Docker image locally:**
   ```bash
   docker run -p 3000:3000 frontend-one:latest
   curl http://localhost:3000  # 200 OK
   ```

3. **Compared with working backend:**
   - Backend had `app.listen(port, '0.0.0.0')` explicitly
   - Frontend relied on Next.js defaults

4. **Solution:** Added `HOSTNAME` environment variable

---

## Challenge #2: Custom Domain DNS Configuration

### The Problem

We needed apex domains (e.g., `example.com`, not `www.example.com`) to work with App Runner.

**GoDaddy limitation:** Can't create CNAME records at apex domain (`@`)

### Why This Matters

App Runner provides a DNS target like:
```
abc123.ap-south-1.awsapprunner.com
```

You can create:
- `www.example.com` → CNAME → `abc123.ap-south-1.awsapprunner.com` (allowed)
- `example.com` → CNAME → `abc123.ap-south-1.awsapprunner.com` (not allowed)

### The Solution: AWS Route 53

Route 53 supports **ALIAS records** at apex domains:

```hcl
resource "aws_route53_hosted_zone" "main" {
  name = "example.com"
}

resource "aws_route53_record" "apex" {
  zone_id = aws_route53_hosted_zone.main.zone_id
  name    = "example.com"
  type    = "A"

  alias {
    name    = "abc123.ap-south-1.awsapprunner.com"
    zone_id = "Z00855883LBHKTIC4ODF2"  # App Runner hosted zone ID for ap-south-1
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_hosted_zone.main.zone_id
  name    = "www.example.com"
  type    = "CNAME"
  ttl     = 300
  records = ["abc123.ap-south-1.awsapprunner.com"]
}
```

### App Runner Custom Domain Setup

1. **Add custom domain association:**
   ```hcl
   resource "aws_apprunner_custom_domain_association" "main" {
     domain_name = "example.com"
     service_arn = aws_apprunner_service.frontend.arn
     enable_www_subdomain = true
   }
   ```

2. **AWS generates SSL validation records:**
   ```
   _abc123.example.com → CNAME → _xyz456.acm-validations.aws
   _def789.www.example.com → CNAME → _uvw012.acm-validations.aws
   ```

3. **Add validation records to Route 53:**
   ```bash
   terraform output -json | jq '.validation_records'
   ```

4. **Wait for SSL certificate validation** (~5-10 minutes)

5. **DNS propagates globally** (~15-60 minutes)

### DNS Debugging

Key commands we used:

```bash
# Check nameservers
dig example.com NS +short
whois example.com | grep "Name Server"

# Check at authoritative nameserver
dig @ns-1234.awsdns-56.org example.com A +short

# Check globally
dig @8.8.8.8 example.com A +short      # Google DNS
dig @1.1.1.1 example.com A +short      # Cloudflare DNS

# Test with specific DNS server
curl --resolve example.com:443:<IP> https://example.com
```

### Common DNS Issues

1. **Issue:** DNS returns parking page IPs
   - **Cause:** Old nameservers cached
   - **Fix:** Wait for TTL expiry or flush local DNS cache

2. **Issue:** Nameservers show old values
   - **Cause:** Registry not updated yet
   - **Check:** `whois` should show new nameservers within 5-15 minutes

3. **Issue:** SSL certificate pending
   - **Cause:** Validation records not in DNS
   - **Fix:** Verify CNAME records with `dig`

---

## Cost Comparison

### AWS Amplify
```
Build costs:    $0.01/minute
Storage:        $0.023/GB/month
Data transfer:  $0.15/GB
CDN:           Included (CloudFront)

Estimated monthly: $30-100
```

**Pros:**
- Simple setup for basic apps
- Automatic CI/CD
- Global CDN included
- Preview deployments

**Cons:**
- Limited monorepo support
- Less control over build
- Can get expensive with many builds

### AWS App Runner
```
vCPU:          $0.064/hour ($46/month for 1 vCPU)
Memory:        $0.007/GB/hour ($10/month for 2GB)
Data transfer: $0.09/GB (first 102GB free)

Per service:   ~$56/month (1 vCPU, 2GB RAM)
3 services:    ~$168/month

Additional:
- ECR storage:  $0.10/GB/month (~$1-5/month)
- Route 53:     $0.50/zone/month ($1/month for 2 domains)
```

**Pros:**
- Full Docker control
- Better for complex apps
- Predictable pricing
- Auto-scaling included
- VPC support

**Cons:**
- More setup required
- No built-in CI/CD
- Slightly higher base cost

### AWS ECS/Fargate (Alternative)
```
vCPU:          $0.04048/hour ($29/month)
Memory:        $0.004445/GB/hour ($6.40/month for 2GB)
Load balancer: $18/month (Application LB)

Per service:   ~$53/month + $18 LB = $71/month
3 services:    ~$231/month (shared LB)
```

**Best for:** Large-scale applications, existing ECS expertise

---

## Key Learnings

### 1. **Monorepos Need Docker**
For complex monorepo setups, Docker provides the control you need:
- Full control over build process
- Proper workspace dependency resolution
- Consistent builds across environments
- Easy local testing

### 2. **Multi-Stage Builds are Essential**
```
Stage 1: Install dependencies
Stage 2: Build application
Stage 3: Production runtime (minimal)
```
This keeps production images small (~150MB vs 1GB+).

### 3. **Platform-Specific Builds Matter**
```bash
--platform linux/amd64  # Required for AWS
```
Building on M1/M2 Macs defaults to ARM64, which won't work on AWS x86 instances.

### 4. **DNS is Complex but Critical**
- ALIAS records enable apex domain support
- Route 53 integrates better with AWS services
- DNS propagation takes time (15-60 minutes globally)
- Always test with multiple DNS servers

### 5. **Next.js Standalone Mode Gotchas**
```javascript
// next.config.js
module.exports = {
  output: 'standalone'  // Optimized for Docker
}
```
But remember:
- Default binding is `127.0.0.1`
- Set `HOSTNAME=0.0.0.0` for containers
- Copy `.next/static` and `public` directories manually

### 6. **Health Check Configuration Matters**
```hcl
health_check_configuration {
  protocol  = "HTTP"
  path      = "/"
  interval  = 20      # Check every 20 seconds
  timeout   = 10      # Wait 10 seconds for response
  healthy_threshold   = 1   # 1 success = healthy
  unhealthy_threshold = 10  # 10 failures = unhealthy
}
```

### 7. **CloudWatch Logs are Your Friend**
```bash
aws logs tail /aws/apprunner/<service>/application --follow --region ap-south-1
```
Essential for debugging deployment issues.

---

## Final Architecture

```
┌─────────────────────────────────────────────────┐
│              AWS Cloud (ap-south-1)             │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │         Route 53 DNS                     │   │
│  │  ├── example-one.com (ALIAS)            │   │
│  │  ├── www.example-one.com (CNAME)        │   │
│  │  ├── example-two.com (ALIAS)            │   │
│  │  └── www.example-two.com (CNAME)        │   │
│  └──────────────────────────────────────────┘   │
│                     ↓                            │
│  ┌──────────────────────────────────────────┐   │
│  │         App Runner Services              │   │
│  │  ┌────────────────────────────────────┐  │   │
│  │  │  Frontend One (1 vCPU, 2GB)       │  │   │
│  │  │  - Auto-scaling: 1-10 instances   │  │   │
│  │  │  - HTTPS + Custom SSL              │  │   │
│  │  └────────────────────────────────────┘  │   │
│  │  ┌────────────────────────────────────┐  │   │
│  │  │  Frontend Two (1 vCPU, 2GB)       │  │   │
│  │  │  - Auto-scaling: 1-10 instances   │  │   │
│  │  │  - HTTPS + Custom SSL              │  │   │
│  │  └────────────────────────────────────┘  │   │
│  │  ┌────────────────────────────────────┐  │   │
│  │  │  Backend API (1 vCPU, 2GB)        │  │   │
│  │  │  - Auto-scaling: 1-5 instances    │  │   │
│  │  │  - HTTPS + Custom SSL              │  │   │
│  │  └────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────┘   │
│                     ↑                            │
│  ┌──────────────────────────────────────────┐   │
│  │      ECR Container Registry              │   │
│  │  ├── frontend-one:latest                │   │
│  │  ├── frontend-two:latest                │   │
│  │  └── backend:latest                     │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Features:**
- All services running with custom domains
- Automatic HTTPS via AWS Certificate Manager
- Auto-scaling based on traffic
- Zero-downtime deployments
- Integrated with CloudWatch for monitoring
- VPC-ready for private resources

---

## Deployment Workflow

```bash
# 1. Build Docker image
docker buildx build --platform linux/amd64 \
  -f apps/frontend/Dockerfile \
  -t frontend:latest . --load

# 2. Test locally
docker run -p 3000:3000 frontend:latest

# 3. Tag for ECR
docker tag frontend:latest \
  <account-id>.dkr.ecr.ap-south-1.amazonaws.com/frontend:latest

# 4. Push to ECR
docker push <account-id>.dkr.ecr.ap-south-1.amazonaws.com/frontend:latest

# 5. Trigger App Runner deployment
aws apprunner start-deployment \
  --service-arn <service-arn> \
  --region ap-south-1

# 6. Monitor deployment
aws apprunner describe-service \
  --service-arn <service-arn> \
  --region ap-south-1 \
  --query 'Service.Status'
```

---

## Conclusion

Deploying a Turborepo monorepo to production taught us valuable lessons:

1. **Not all AWS services are created equal** - Amplify works great for simple apps, but complex monorepos need more control
2. **Docker provides flexibility** - Full control over build process is worth the extra setup
3. **Infrastructure as Code is essential** - Terraform made our deployment reproducible and maintainable
4. **DNS is always the hardest part** - Route 53 integration was crucial for custom apex domains
5. **Debugging is iterative** - CloudWatch logs, local Docker testing, and DNS tools were essential

**Total time:** ~8 hours from Amplify failures to working production deployment

**Final setup:**
- 3 services running on App Runner
- Custom domains with apex support
- Automatic SSL certificates
- Auto-scaling enabled
- **Cost:** ~$170/month for all three services

Would we do it again? **Absolutely.** App Runner provides the perfect balance of control and simplicity for containerized applications.

---

## Resources

- [AWS App Runner Documentation](https://docs.aws.amazon.com/apprunner/)
- [Next.js Standalone Mode](https://nextjs.org/docs/advanced-features/output-file-tracing)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [AWS Route 53 ALIAS Records](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-choosing-alias-non-alias.html)
- [Multi-stage Docker Builds](https://docs.docker.com/build/building/multi-stage/)

---

*Have questions or run into similar issues? Feel free to reach out or leave a comment below!*
