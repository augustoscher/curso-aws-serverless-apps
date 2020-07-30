const clusterName = "serverless-project"
const projectName = "serverless-project-01"
const ssmPrefix = "/prod/serverless-project-01"

const variables = {
  ECS_TASK_DEFINITION: {
    value: "process-data:1",
    type: "String"
  },  
  ECS_CLUSTER_NAME: {
    value: "serverless-project",
    type: "String"
  },  
  ECS_TASK_LAUNCH_TYPE: {
    value: "FARGATE",
    type: "String"
  },  
  ECS_TASK_COUNT: {
    value: "1",
    type: "String"
  },  
  ECS_TASK_PLATFORM_VERSION: {
    value: "LATEST",
    type: "String"
  },
  ECS_TASK_CONTAINER_NAME: {
    value: "process-data",
    type: "String"
  },
  ECS_TASK_CONTAINER_FILE_ENV_NAME: {
    value: "SURVEY_FILE",
    type: "String"
  },
  ECS_TASK_SUBNETS: {
    value: [
      "subnet-972b9fa9",
      "subnet-9183ecbf",
      "subnet-ccb3de90",
      "subnet-2ddcec67",
      "subnet-7fa4c418",
      "subnet-548dd75b"
    ].join(','),
    type: "StringList"
  },
  ECS_TASK_SECURITY_GROUPS: {
    value: [
      "sg-020a0f6774e30864d"
    ].join(','),
    type: "StringList"
  },
  ECS_TASK_ASSIGN_PUBLIC_IP: {
    value: "ENABLED",
    type: "String"
  },
  ECS_PROCESS_DATA_IMAGE_URL: {
    value: "824273212766.dkr.ecr.us-east-1.amazonaws.com/process-data",
    type: "String"
  },
  BUCKET_REPORTS: {
    value: "reports",
    type: "String"
  },
  LOG_GROUP_NAME: {
    value: "/ecs/serverless-project-01",
    type: "String"
  },
  SSM_PREFIX: {
    value: ssmPrefix,
    type: "String"
  },
  BUCKET_SURVEYS: {
    value: "surveys-augustoscher-001",
    type: "String"
  },
  REGION: {
    value: "us-east-1",
    type: "String"
  }
}

module.exports = {
  variables,
  ssmPrefix
}
