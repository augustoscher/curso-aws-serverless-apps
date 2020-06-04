# Tooling - S3 and SQS

We're using serverless-offline, nodemom and localstack packages to run lambas locally

## Deploying

After cloning and enter on `sqs-s3-streams` directory, do:

1. Seting up cloud stack:

> ./scripts/setup.sh arquivos-augusto-001 file-handler /home/augusto.scher/git/rep/curso-aws-serverless-apps/07-tooling/sqs-s3-streams/scripts/s3/file.csv

2. In another terminal, run logs on sqs lambda

> npm run logs:sqslistener

3. Deploy csv file many times as you will. Logs should appear by showing stream results

> npm run invoke:s3

## Removing stack

1. Run remove script to remove all resources

> ./scripts/remove.sh arquivos-augusto-001