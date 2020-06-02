#!/bin/bash

# ./create-queue.sh file-handler 

# Create queue on sqs
QUEUE_NAME=$1

aws \
  sqs create-queue \
  --queue-name $QUEUE_NAME \
  --endpoint-url=http://localhost:4576

aws \
  sqs list-queues \
  --endpoint-url=http://localhost:4576

# {
#   "QueueUrls": [
#        "http://localhost:4576/queue/file-handler",
#       "https://queue.amazonaws.com/824273212766/file-handler"
#   ]
# }
