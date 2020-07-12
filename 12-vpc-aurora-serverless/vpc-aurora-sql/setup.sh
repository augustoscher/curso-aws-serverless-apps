#!/bin/bash

# init mysql service
docker-compose up -d mysql

# build app
docker-compose up --build app

# call hello
curl localhost:3000/dev/hello 