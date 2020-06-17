#!/bin/bash

HOST=http://0.0.0.0:3000

TOKEN=$(curl -X POST \
  --silent \
  -H 'Content-Type: application/json' \
  --data '{"username": "augustoscher", "password": "123"}' \
  $HOST/dev/login \
  | jq '.token' \
  | sed 's/"//g' \
  | tee requests/token.log
)

echo "Token: $TOKEN"
echo

