#!/bin/bash

# ./scripts/remove.sh arquivos-augusto-001

BUCKET_NAME=$1

echo "removing items from bucket..."
aws  \
  s3 rm s3://$BUCKET_NAME \
  --recursive
  # --endpoint-url=http://localhost:4572

aws  \
  s3 ls $BUCKET_NAME \
  # --endpoint-url=http://localhost:4572

echo "removing stack..."
sls remove