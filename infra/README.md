# Infrastructure Setup

This directory contains Terraform configuration for deploying the website to AWS using S3 + CloudFront.

## Architecture

- **S3 Bucket** (ap-south-1): Stores static website files
- **CloudFront** (Global): CDN for fast content delivery with www→non-www redirect
- **CloudFront Function**: Redirects www.manishj.com to manishj.com (301)
- **ACM Certificate** (us-east-1): SSL/TLS certificate for HTTPS (covers both apex and www)
- **Route 53**: DNS management for custom domain (apex + www subdomain)

## Prerequisites

1. **AWS CLI** configured with credentials
   ```bash
   aws configure
   ```

2. **Terraform** installed (>= 1.0)
   ```bash
   brew install terraform  # macOS
   ```

3. **Domain registered** (manishj.com)

## Deployment Steps

### 1. Initialize Terraform

```bash
cd infra
terraform init
```

### 2. Review the Plan

```bash
terraform plan
```

### 3. Apply Infrastructure

```bash
terraform apply
```

This will create:
- S3 bucket in ap-south-1
- CloudFront distribution (global)
- CloudFront function for www→non-www redirect
- ACM certificate in us-east-1 (covers manishj.com and www.manishj.com)
- Route 53 hosted zone and DNS records (A records for apex and www)

### 4. Update Domain Nameservers

After Terraform completes, it will output Route 53 nameservers:

```bash
terraform output route53_nameservers
```

Go to your domain registrar (GoDaddy, Namecheap, etc.) and update nameservers to the ones shown above.

### 5. Wait for DNS Propagation

DNS changes can take 15 minutes to 48 hours. Check status:

```bash
dig manishj.com NS +short
```

## Deployment Script

Use the deployment script to build and deploy your site:

```bash
cd ..
./scripts/deploy.sh
```

## Cost Estimate

**Monthly (~$1-5):**
- S3 Storage: ~$0.50
- CloudFront: First 50GB free, then $0.085/GB
- CloudFront Functions: FREE (first 2M invocations/month, then $0.10/1M)
- Route 53: $0.50/hosted zone
- ACM Certificate: FREE
- Data Transfer: ~$1-3

**For a personal portfolio site, CloudFront Functions will be $0/month** (well within the 2M free tier).

## Useful Commands

```bash
# Check what resources exist
terraform state list

# Show specific resource details
terraform show

# Destroy all infrastructure (careful!)
terraform destroy

# Format Terraform files
terraform fmt

# Validate configuration
terraform validate
```

## Architecture Notes

### Why us-east-1 for ACM?

CloudFront requires ACM certificates to be in **us-east-1**. This is a hard AWS requirement. We use a secondary provider alias for this:

```hcl
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
```

### S3 in ap-south-1

Your S3 bucket is in ap-south-1 as requested. CloudFront will cache content globally at edge locations, so your Indian audience will still get fast load times.

### WWW to Non-WWW Redirect

The CloudFront Function intercepts requests to `www.manishj.com` and issues a 301 permanent redirect to `manishj.com`. This happens at the edge before hitting the origin, so it's fast and SEO-friendly.

**How it works:**
1. User visits `www.manishj.com`
2. CloudFront Function runs on viewer-request event
3. Function detects `www.` prefix in hostname
4. Returns 301 redirect to `https://manishj.com/path`
5. Browser redirects to non-www version

Both domains (apex and www) are covered by the same ACM certificate and CloudFront distribution for seamless HTTPS.

## Troubleshooting

### Certificate validation pending

DNS validation records may take a few minutes to propagate. Check Route 53 console for validation status.

### CloudFront 403 errors

Ensure S3 bucket policy allows CloudFront OAC access. Check `s3.tf` for correct policy.

### DNS not resolving

Verify nameservers at registrar match Route 53 output. Use `dig` or `nslookup` to debug.
