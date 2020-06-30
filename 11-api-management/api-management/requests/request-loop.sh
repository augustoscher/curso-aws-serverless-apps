#!/bin/bash

echo "Press <CTRL+C> to exit."

HOST=https://3lgkw2wdw5.execute-api.us-east-1.amazonaws.com
APIKEY="dxyB4oINNu1IM6kub06E24nT3LD8SwxX7aXQU25b"

while :
do
  curl --silent \
    -H "x-api-key: $APIKEY" \
    $HOST/dev/hello
done
