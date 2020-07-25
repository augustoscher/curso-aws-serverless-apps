#!/bin/bash

APP_NAME="process-data"
CLUSTER_NAME="serverless-project"
PROJECT_NAME="serverless-project-01"
REGION="us-east-1"
LOG_GROUP_NAME="/ecs/$PROJECT_NAME"

ECS_ROLE_NAME="ecsTaskExecutionRole"
ECS_ROLE_ARN="arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"

CUSTOM_POLICY_NAME="$APP_NAME"-policy
CUSTOM_POLICY_ARN="arn:aws:iam::824273212766:policy/process-data-policy"

ECR_URI_DOCKER="824273212766.dkr.ecr.us-east-1.amazonaws.com/process-data"
SSM_ENV_PATH="/prod/$PROJECT_NAME/"

aws iam create-role \
  --region $REGION \
  --role-name $ECS_ROLE_NAME \
  --assume-role-policy-document file://templates/task-execution-assume-role.json \
  | tee logs/1.iam-create-role.txt

# dar permissão de executar chamadas ecs na role
aws iam attach-role-policy \
  --region $REGION \
  --role-name $ECS_ROLE_NAME \
  --policy-arn $ECS_ROLE_ARN

# permissão para a instancia acessar o s3 e variaveis de ambiente
# - acessar o bucket surveys
# - fazer download do csv de surveys
# - fazer upload para a pasta surveys/reports
# - ler as variáveis de System Management Store

aws iam create-policy \
  --policy-name $CUSTOM_POLICY_NAME \
  --policy-document file://templates/custom-access-policy.json \
  | tee logs/2.create-policy.txt

# Adicionar policy acima na role principal

aws iam attach-role-policy \
  --region $REGION \
  --role-name $ECS_ROLE_NAME \
  --policy-arn $CUSTOM_POLICY_ARN

# Criar cluster do Elastic Container Service (ECS)

aws ecs create-cluster \
  --cluster-name $CLUSTER_NAME \
  | tee logs/3.create-cluster.txt

# Criar grupo de logs especifica para o cluster no cloudwatch

aws logs create-log-group \
  --log-group-name $LOG_GROUP_NAME \
  | tee logs/4.logs-create-log-group.txt

# Criar container registry

aws ecr create-repository \
  --repository-name $APP_NAME \
  --image-scanning-configuration scanOnPush=true \
  --region $REGION \
  | tee logs/5.create-docker-repo.txt

aws ecs register-task-definition \
  --cli-input-json file://templates/task-definition.json \
  | tee logs/6.register-task.txt

