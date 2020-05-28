#!/bin/bash

# Setup lambda locally
sls offline

# Calling hello word in another terminal
curl http://localhost:3000/dev/hello

# Creating and Run test
sls create test -f hello
yarn test

# Running docker-compose for localstack
docker-compose up -d localstack

# Building docker-compose
docker-compose up --build