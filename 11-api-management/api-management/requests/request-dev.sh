#!/bin/bash


HOST=http://localhost:3000
APIKEY="d41d8cd98f00b204e9800998ecf8427e"


## Get Usage plans 
curl --silent \
  -H "x-api-key: $APIKEY" \
  $HOST/dev/hello

curl --silent \
  $HOST/dev/getUsagePlans | tee requests/getUsagePlans.log



## Creating new API 
USAGE_PLAN_ID="73lt09"

CUSTOMER_NAME='augustoscher@gmail.com'
curl --silent \
  "$HOST/dev/addkey?name=$CUSTOMER_NAME&usagePlanId=$USAGE_PLAN_ID" \
  | tee requests/addKey.log



## Get usage of API
KEY_ID=jnokr93kjb 
APIKEY="lBeoK3C0oU5FgWFI7elJk9a7dQ9UChn76LE9QuCy"
FROM="2020-06-27"
TO="2020-06-30"

curl --silent \
  "$HOST/dev/getUsage?keyId=$KEY_ID&usagePlanId=$USAGE_PLAN_ID&from=$FROM&to=$TO" \
  | tee requests/usage.log

