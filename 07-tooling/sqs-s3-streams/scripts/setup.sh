#!/bin/bash

# ./setup.sh arquivos-augusto-001 file-handler

BUCKET_NAME=$1
QUEUE_NAME=$2

echo "creating bucket..."
aws  \
  s3 mb s3://$BUCKET_NAME \
  --endpoint-url=http://localhost:4572

aws  \
  s3 ls \
  --endpoint-url=http://localhost:4572

aws  \
  s3 ls $BUCKET_NAME \
  --endpoint-url=http://localhost:4572

echo "creating queue..."

aws \
  sqs create-queue \
  --queue-name $QUEUE_NAME \
  --endpoint-url=http://localhost:4576

aws \
  sqs list-queues \
  --endpoint-url=http://localhost:4576
