#!/bin/bash

echo "------------- DEV --------------"
echo

HOST=http://localhost:3000
APIKEY="d41d8cd98f00b204e9800998ecf8427e"

curl --silent \
  -H "x-api-key: $APIKEY" \
  $HOST/dev/hello

curl --silent \
  $HOST/dev/getUsagePlans | tee requests/getUsagePlans.log



echo
echo "------------- PROD --------------"
echo

HOST_PROD=https://3lgkw2wdw5.execute-api.us-east-1.amazonaws.com
APIKEY_PROD="Uoi1kz4xIhajfc4IowkCn3wk5tV4D9cM2xx0YlA2"

curl --silent \
  -H "x-api-key: $APIKEY_PROD" \
  $HOST_PROD/dev/hello
