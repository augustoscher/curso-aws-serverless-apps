#!/bin/bash
# ./create-bucket.sh my-bucket

# Create S3 bucket
BUCKET_NAME=$1

aws  \
  s3 mb s3://$BUCKET_NAME \
  # --endpoint-url=http://localhost:4572

aws  \
  s3 ls \
  # --endpoint-url=http://localhost:4572