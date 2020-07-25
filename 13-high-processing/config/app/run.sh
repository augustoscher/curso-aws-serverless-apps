#!/bin/bash

IMAGE_URL="824273212766.dkr.ecr.us-east-1.amazonaws.com/process-data"

docker build -t $IMAGE_URL .

docker run $IMAGE_URL
