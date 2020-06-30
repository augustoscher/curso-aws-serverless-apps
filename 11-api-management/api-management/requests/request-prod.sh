#!/bin/bash

HOST=https://3lgkw2wdw5.execute-api.us-east-1.amazonaws.com
APIKEY="Uoi1kz4xIhajfc4IowkCn3wk5tV4D9cM2xx0YlA2"

# curl --silent \
#   -H "x-api-key: $APIKEY" \
#   $HOST/dev/hello


# from getUsagePlans.log
USAGE_PLAN_ID="73lt09"

## Creating API
CUSTOMER_NAME='test@gmail.com'
curl --silent \
  "$HOST/dev/addkey?name=$CUSTOMER_NAME&usagePlanId=$USAGE_PLAN_ID" \
  | tee requests/addKey.log


## Get usage
KEY_ID=n4x91xh449
APIKEY="Uoi1kz4xIhajfc4IowkCn3wk5tV4D9cM2xx0YlA2"
FROM="2020-06-27"
TO="2020-06-28"

curl --silent \
  "$HOST/dev/getUsage?keyId=$KEY_ID&usagePlanId=$USAGE_PLAN_ID&from=$FROM&to=$TO" \
  | tee requests/usage.log


