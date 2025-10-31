#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get bucket name and CloudFront ID from Terraform
cd infra
BUCKET_NAME=$(terraform output -raw s3_bucket_name 2>/dev/null || echo "")
CLOUDFRONT_ID=$(terraform output -raw cloudfront_distribution_id 2>/dev/null || echo "")
cd ..

if [ -z "$BUCKET_NAME" ]; then
    echo -e "${RED}❌ Error: Could not get S3 bucket name from Terraform.${NC}"
    echo "Please run 'cd infra && terraform apply' first."
    exit 1
fi

echo -e "${BLUE}📦 Building static site...${NC}"
pnpm build

if [ ! -d "out" ]; then
    echo -e "${RED}❌ Error: Build failed. 'out' directory not found.${NC}"
    exit 1
fi

echo -e "${BLUE}☁️  Uploading to S3 bucket: ${BUCKET_NAME}${NC}"
aws s3 sync out/ s3://${BUCKET_NAME}/ \
    --delete \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "*.html" \
    --exclude "*.xml" \
    --region ap-south-1

# Upload HTML and XML files with shorter cache
echo -e "${BLUE}📄 Uploading HTML files with shorter cache...${NC}"
aws s3 sync out/ s3://${BUCKET_NAME}/ \
    --cache-control "public, max-age=0, must-revalidate" \
    --exclude "*" \
    --include "*.html" \
    --include "*.xml" \
    --region ap-south-1

if [ -n "$CLOUDFRONT_ID" ]; then
    echo -e "${BLUE}🔄 Invalidating CloudFront cache...${NC}"
    INVALIDATION_ID=$(aws cloudfront create-invalidation \
        --distribution-id ${CLOUDFRONT_ID} \
        --paths "/*" \
        --query 'Invalidation.Id' \
        --output text)

    echo -e "${GREEN}✅ Invalidation created: ${INVALIDATION_ID}${NC}"
    echo "Note: Invalidation may take 1-2 minutes to complete."
else
    echo -e "${BLUE}⚠️  No CloudFront distribution found. Skipping cache invalidation.${NC}"
fi

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "🌐 Your site is available at:"
echo "   https://manishj.com"
echo ""
echo "📊 Useful commands:"
echo "   Check invalidation status: aws cloudfront get-invalidation --distribution-id ${CLOUDFRONT_ID} --id ${INVALIDATION_ID}"
echo "   View CloudFront logs: aws cloudfront list-distributions"
