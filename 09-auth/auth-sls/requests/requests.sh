#!/bin/bash

HOST=http://0.0.0.0:3000

curl -X POST \
  --silent \
  -H 'Content-Type: application/json' \
  --data '{"username": "augustoscher", "password": "123"}' \
  $HOST/dev/login