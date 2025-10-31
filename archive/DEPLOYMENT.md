# Deployment Guide

Complete guide for deploying manishj.com to AWS using S3 + CloudFront.

## Quick Start

```bash
# 1. Test build locally
pnpm build

# 2. Deploy infrastructure
cd infra
terraform init
terraform plan
terraform apply

# 3. Update domain nameservers (from terraform output)
terraform output route53_nameservers

# 4. Wait for DNS propagation (15 min - 48 hours)

# 5. Deploy website
cd ..
./scripts/deploy.sh
```

## Architecture

```
┌─────────────────────────────────────────────┐
│  GitHub Repository (manishj-website)        │
└─────────────────────────────────────────────┘
                  ↓
        ┌─────────────────┐
        │   Local Build   │
        │  pnpm build     │
        │  → ./out/       │
        └─────────────────┘
                  ↓
┌──────────────────────────────────────────────┐
│              AWS (ap-south-1)                │
│  ┌────────────────────────────────────────┐  │
│  │  S3 Bucket (manishj.com)              │  │
│  │  - Static files                        │  │
│  │  - Versioning enabled                  │  │
│  │  - Private (OAC access only)           │  │
│  └────────────────────────────────────────┘  │
│                  ↑                            │
│  ┌────────────────────────────────────────┐  │
│  │  CloudFront Distribution (Global)     │  │
│  │  - HTTPS only                          │  │
│  │  - Custom domains                      │  │
│  │  - Global edge caching                 │  │
│  └────────────────────────────────────────┘  │
│                  ↑                            │
│  ┌────────────────────────────────────────┐  │
│  │  Route 53 (DNS)                        │  │
│  │  - manishj.com → CloudFront           │  │
│  │  - www.manishj.com → CloudFront       │  │
│  └────────────────────────────────────────┘  │
│                                                │
│  ┌────────────────────────────────────────┐  │
│  │  ACM Certificate (us-east-1)          │  │
│  │  - SSL/TLS for HTTPS                   │  │
│  │  - Auto-renewal                        │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

## Prerequisites

1. **AWS Account** with credentials configured
   ```bash
   aws configure
   # Enter: Access Key ID, Secret Access Key, Region (ap-south-1)
   ```

2. **Terraform** installed
   ```bash
   # macOS
   brew install terraform

   # Verify
   terraform --version
   ```

3. **Node.js & pnpm**
   ```bash
   node --version  # Should be v20+
   pnpm --version  # Should be v10+
   ```

4. **Domain registered** - manishj.com (GoDaddy, Namecheap, etc.)

## Step-by-Step Deployment

### Step 1: Verify Local Build

```bash
pnpm build
```

This creates the `./out` directory with:
- HTML files (index.html, 404.html, etc.)
- CSS/JS assets
- Images and fonts

### Step 2: Initialize Terraform

```bash
cd infra
terraform init
```

This downloads AWS provider and initializes Terraform.

### Step 3: Review Infrastructure Plan

```bash
terraform plan
```

This shows what will be created:
- S3 bucket (ap-south-1)
- CloudFront distribution
- ACM certificate (us-east-1)
- Route 53 hosted zone
- DNS records

### Step 4: Apply Infrastructure

```bash
terraform apply
```

Type `yes` when prompted. This takes ~15-20 minutes due to:
- ACM certificate validation (5-10 min)
- CloudFront distribution creation (10-15 min)

### Step 5: Update Domain Nameservers

Get the nameservers:
```bash
terraform output route53_nameservers
```

Output will look like:
```
[
  "ns-123.awsdns-12.com",
  "ns-456.awsdns-45.net",
  "ns-789.awsdns-78.org",
  "ns-012.awsdns-01.co.uk"
]
```

**Update at your domain registrar:**
1. Log into GoDaddy/Namecheap/etc.
2. Find DNS/Nameserver settings
3. Replace with the 4 Route 53 nameservers above
4. Save changes

### Step 6: Wait for DNS Propagation

DNS changes take time:
- **Minimum:** 15 minutes
- **Average:** 2-4 hours
- **Maximum:** 48 hours

Check status:
```bash
# Check nameservers
dig manishj.com NS +short

# Should show Route 53 nameservers when ready
```

### Step 7: Deploy Website

```bash
cd ..
./scripts/deploy.sh
```

This script:
1. Builds the static site (`pnpm build`)
2. Uploads files to S3
3. Invalidates CloudFront cache
4. Shows deployment status

### Step 8: Verify Deployment

Visit your site:
- https://manishj.com
- https://www.manishj.com

Both should load with HTTPS (green lock icon).

## Updating the Website

After making changes:

```bash
# Make your changes
# Test locally: pnpm dev

# Deploy
./scripts/deploy.sh
```

The script handles:
- Building the site
- Uploading to S3
- Cache invalidation

Changes appear in 1-2 minutes.

## Cost Breakdown

**Monthly (~$1-5):**
- S3 Storage: ~$0.50 (for ~2GB)
- CloudFront: First 50GB free, then $0.085/GB
- Route 53: $0.50/hosted zone
- ACM Certificate: FREE
- CloudFront Invalidations: First 1,000/month free
- Data Transfer: ~$1-3 (depends on traffic)

**One-time:**
- Domain registration: ~$10-15/year (at registrar)

## Troubleshooting

### Build fails with "output: export" error

Make sure you're using Next.js 16+:
```bash
pnpm list next
```

### Terraform apply fails - "Certificate validation timeout"

DNS propagation is slow. Wait 15-30 minutes and retry:
```bash
terraform apply
```

### Website shows 403 Forbidden

S3 bucket policy may be incorrect. Check:
```bash
cd infra
terraform apply -refresh=true
```

### DNS not resolving

1. Verify nameservers at registrar match Route 53
2. Check DNS propagation: `dig manishj.com NS +short`
3. Clear local DNS cache:
   ```bash
   # macOS
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   ```

### CloudFront shows old content

Invalidation may not be complete. Check status:
```bash
aws cloudfront list-invalidations --distribution-id <ID>
```

Or manually invalidate:
```bash
aws cloudfront create-invalidation \
  --distribution-id <ID> \
  --paths "/*"
```

## Useful Commands

```bash
# Check Terraform state
cd infra
terraform state list
terraform show

# Get outputs
terraform output

# Destroy everything (careful!)
terraform destroy

# Check S3 bucket contents
aws s3 ls s3://manishj.com/

# Check CloudFront distribution
aws cloudfront list-distributions

# View CloudFront cache statistics
aws cloudfront get-distribution-config --id <ID>
```

## Security Notes

1. **S3 Bucket is Private** - Only CloudFront can access it (via OAC)
2. **HTTPS Only** - HTTP requests redirect to HTTPS
3. **TLS 1.2+** - Modern encryption protocols only
4. **No Public Access** - All S3 public access blocked

## Advanced: CI/CD with GitHub Actions

Want automatic deployment on push? Add `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-south-1

      - name: Deploy to S3
        run: ./scripts/deploy.sh
```

Add AWS credentials to GitHub Secrets.

## Rollback

If deployment goes wrong:

```bash
# S3 versioning is enabled, so you can restore previous versions
aws s3api list-object-versions --bucket manishj.com

# Or revert to previous commit and redeploy
git revert HEAD
./scripts/deploy.sh
```

## Support

- AWS Documentation: https://docs.aws.amazon.com
- Terraform AWS Provider: https://registry.terraform.io/providers/hashicorp/aws
- Next.js Static Export: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
