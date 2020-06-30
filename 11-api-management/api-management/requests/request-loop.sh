#!/bin/bash

echo "Press <CTRL+C> to exit."

HOST_PROD=https://3lgkw2wdw5.execute-api.us-east-1.amazonaws.com
APIKEY_PROD="dxyB4oINNu1IM6kub06E24nT3LD8SwxX7aXQU25b"

while :
do
  curl --silent \
    -H "x-api-key: $APIKEY_PROD" \
    $HOST_PROD/dev/hello
done
