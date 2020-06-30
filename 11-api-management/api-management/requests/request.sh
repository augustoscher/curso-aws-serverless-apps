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
