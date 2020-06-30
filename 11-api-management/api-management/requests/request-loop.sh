#!/bin/bash

echo "Press <CTRL+C> to exit."

HOST_PROD=https://3lgkw2wdw5.execute-api.us-east-1.amazonaws.com
APIKEY_PROD="Uoi1kz4xIhajfc4IowkCn3wk5tV4D9cM2xx0YlA2"

while :
do
  curl --silent \
    -H "x-api-key: $APIKEY_PROD" \
    $HOST_PROD/dev/hello
done
