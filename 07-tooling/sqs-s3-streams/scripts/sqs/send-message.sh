#!/bin/bash

# ./send-message.sh my-queue 

# Send message to an SQS queue
QUEUE_URL=$1
MESSAGE_BODY=$2

echo 'Sending message to ' $QUEUE_URL

aws \
  sqs send-message \
  --queue-url $QUEUE_URL \
  --message-body $MESSAGE_BODY \
  --endpoint-url=http://localhost:4576

aws \
  sqs receive-message \
  --queue-url $QUEUE_URL \
  --endpoint-url=http://localhost:4576
