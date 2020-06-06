#!/bin/bash

echo "Running localstack on docker,,,"
docker-compose up -d

echo "Starting app..."
npm run start