#!/bin/bash

#1. Install serverless
npm i -g serverless

#2. Creating new project with serverless framework
sls

#3. Deploying
sls deploy

#4. Accessing generated endpoint
https://ieoz61wjil.execute-api.us-east-1.amazonaws.com/dev/hello

#5. We also can invoke lambda
sls invoke -f hello

#6. Invoke local
sls invoke local -f hello --log

#7. Configure dashboard
sls

#8. Showing logs
sls logs -f hello --tail