const dynamoose = require('dynamoose');

function setupDynamoDBClient() {
  if (!process.env.IS_LOCAL){
    return;
  }

  const host = process.env.LOCALSTACK_HOST;
  const port = process.env.DYNAMODB_PORT;

  dynamoose.local(`http://${host}:${port}`)
  console.log('running dynamodb locally', host, port);
}

module.exports = setupDynamoDBClient;
