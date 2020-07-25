#!/bin/bash

APP_NAME="process-data"
CLUSTER_NAME="serverless-project"
PROJECT_NAME="serverless-project-01"
REGION="us-east-1"
LOG_GROUP_NAME=""

ECS_ROLE_NAME="ecsTaskExecutionRole"
ECS_ROLE_ARN=""

aws iam create-role \
  --region $REGION \
  --role-name $ECS_ROLE_NAME \
  --assume-role-policy-document file://templates/task-execution-assume-role.json \
  | tee logs/1.iam-create-role.txt

