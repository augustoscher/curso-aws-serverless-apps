#!/bin/bash

#1. Create security policies json file
#2. Create security roles at AWS
aws iam create-role \
  --role-name lambda-without-framework \
  --assume-role-policy-document file://policies.json \
  | tee logs/role.log

#3. Create file and zip
zip function.zip index.js

#4. Create Lambda (arn comes from role.log file)
aws lambda create-function \
  --function-name lambda-without-framework \
  --zip-file fileb://function.zip \
  --handler index.handler \
  --runtime nodejs12.x \
  --role arn:aws:iam::824273212766:role/lambda-without-framework \
  | tee logs/lambda-create.log

#5. Invoke lambda
aws lambda invoke \
  --function-name lambda-without-framework \
  --log-type Tail \
  logs/lambda-exec.log

#6. Update lambda (zip and update)
zip function.zip index.js

aws lambda update-function-code \
  --zip-file fileb://function.zip \
  --function-name lambda-without-framework \
  --publish \
  | tee logs/lambda-update.log

# Invoke function again

#7. Remove lambda
aws lambda delete-function \
  --function-name lambda-without-framework

#8. Remove IAM role
aws iam delete-role \
  --role-name lambda-without-framework
