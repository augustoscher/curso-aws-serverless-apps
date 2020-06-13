#!/bin/bash

echo "Running localstack on docker..."
docker-compose up -d

echo "Starting app..."
npm run start

echo "testing"
curl localhost:3000/dev/hello
