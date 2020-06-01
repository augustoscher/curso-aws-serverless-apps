#!/bin/bash

# Running docker-compose for localstack
docker-compose up -d localstack

# Building docker-compose
docker-compose up --build

# Stop and remove images and volumes
docker-compose down
docker volume rm tooling-s3-sqs_nodemodules
