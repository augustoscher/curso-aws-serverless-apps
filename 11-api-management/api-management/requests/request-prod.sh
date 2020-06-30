#!/bin/bash

HOST=https://3lgkw2wdw5.execute-api.us-east-1.amazonaws.com
APIKEY="Uoi1kz4xIhajfc4IowkCn3wk5tV4D9cM2xx0YlA2"

## Calling Hello 
curl --silent \
  -H "x-api-key: $APIKEY" \
  $HOST/dev/hello


## Get usage plans
curl --silent \
  $HOST/dev/getUsagePlans

# from getUsagePlans.log
USAGE_PLAN_ID="73lt09"

## Creating API
CUSTOMER_NAME='test@gmail.com'
curl --silent \
  "$HOST/dev/addkey?name=$CUSTOMER_NAME&usagePlanId=$USAGE_PLAN_ID" \
  | tee requests/addKey.log

# Return:
# {
#   "apiKeyToken": "4HHxRhzVwN65xWWzSCxJb2GKpQqKQtsIvOyS5UA5",
#   "apiKeyId": "ewqydrrc1b",
#   "message": "Use ewqydrrc1b to check quota and 'x-api-key: 4HHxRhzVwN65xWWzSCxJb2GKpQqKQtsIvOyS5UA5' to make requests."
# }

## Get usage
KEY_ID=ewqydrrc1b
APIKEY="4HHxRhzVwN65xWWzSCxJb2GKpQqKQtsIvOyS5UA5"
FROM="2020-06-27"
TO="2020-06-30"

curl --silent \
  "$HOST/dev/getUsage?keyId=$KEY_ID&usagePlanId=$USAGE_PLAN_ID&from=$FROM&to=$TO" \
  | tee requests/usage.log

# Return:
# {
#   "usagePlanId": "73lt09",
#   "startDate": "2020-06-27",
#   "endDate": "2020-06-30",
#   "items": {}
# }

## Hitting on /dev/hello again to raise limit
while :
do
  curl --silent \
    -H "x-api-key: $APIKEY" \
    $HOST/dev/hello
done


## Get usage again
curl --silent \
  "$HOST/dev/getUsage?keyId=$KEY_ID&usagePlanId=$USAGE_PLAN_ID&from=$FROM&to=$TO"

# Return:
# {
#   "usagePlanId": "73lt09",
#   "startDate": "2020-06-27",
#   "endDate": "2020-06-30",
#   "items": {
#     "ewqydrrc1b": [
#       [
#         0,
#         5
#       ],
#       [
#         0,
#         5
#       ],
#       [
#         0,
#         5
#       ],
#       [
#         5,
#         0
#       ]
#     ]
#   }
# }