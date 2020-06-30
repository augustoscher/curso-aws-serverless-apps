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


# from getUsagePlans.log
USAGE_PLAN_ID="73lt09"

# augusto.scher@gmail.com
KEY_ID=n4x91xh449
APIKEY="Uoi1kz4xIhajfc4IowkCn3wk5tV4D9cM2xx0YlA2"
FROM="2020-06-27"
TO="2020-06-28"

curl --silent \
  "$HOST/dev/getUsage?keyId=$KEY_ID&usagePlanId=$USAGE_PLAN_ID&from=$FROM&to=$TO" \
  | tee requests/usage.log


CUSTOMER_NAME='augustoscher@gmail.com'
curl --silent \
  "$HOST_PROD/dev/addkey?name=$CUSTOMER_NAME&usagePlanId=$USAGE_PLAN_ID" \
  | tee requests/addKey.log
