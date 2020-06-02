#!/bin/bash

# ./create-queue.sh my-queue 

# Create queue on sqs
QUEUE_NAME=$1

aws \
  sqs create-queue \
  --queue-name $QUEUE_NAME \
  --endpoint-url=http://localhost:4576

aws \
  sqs list-queues \
  --endpoint-url=http://localhost:4576