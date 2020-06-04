#!/bin/bash

# Run setup:
# ./scripts/setup.sh arquivos-augusto-001 file-handler /home/augusto.scher/git/rep/curso-aws-serverless-apps/07-tooling/sqs-s3-streams/scripts/s3/file.csv
# Run logs on sqs lambda
# npm run logs:sqslistener
# Deploy file and you will be able to see streams on logs
# npm run invoke:s3

BUCKET_NAME=$1
QUEUE_NAME=$2
FILE_PATH=$3

echo "1. deploying..."
sls deploy

echo "2. creating bucket..."
aws  \
  s3 mb s3://$BUCKET_NAME \
  # --endpoint-url=http://localhost:4572

echo "3. creating queue..."

aws \
  sqs create-queue \
  --queue-name $QUEUE_NAME \
  # --endpoint-url=http://localhost:4576

aws \
  sqs list-queues \
  # --endpoint-url=http://localhost:4576

echo "4. deploying csv..."
aws  \
  s3 cp $FILE_PATH s3://$BUCKET_NAME \

aws  \
  s3 ls $BUCKET_NAME \
  # --endpoint-url=http://localhost:4572