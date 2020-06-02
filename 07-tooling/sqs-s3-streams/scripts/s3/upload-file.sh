#!/bin/bash

# ./upload-file.sh arquivos-augusto-001 /home/augusto.scher/git/rep/curso-aws-serverless-apps/07-tooling/sqs-s3-streams/scripts/s3/file.csv
# When file is pasted on bucket, lambda will be called

# Upload file to existing bucket
BUCKET_NAME=$1
FILE_PATH=$2

aws  \
  s3 cp $FILE_PATH s3://$BUCKET_NAME \
  # --endpoint-url=http://localhost:4572

aws  \
  s3 ls s3://$BUCKET_NAME \
  # --endpoint-url=http://localhost:4572