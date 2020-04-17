class Handler {
  constructor({ dynamoDbSvc }) {
    this.dynamoDbSvc = dynamoDbSvc;
    this.dynamoDbTable = process.env.DYNAMODB_TABLE;
  }

  prepareData(data) {
    const params = {
      
    }
  }

  async main(event) {
    const data = JSON.parse(event.body);

    try {
      return {
        statusCode: 200,
        body: "ok",
      };
    } catch (error) {
      console.log("Error: ", error.stack);
      return {
        statusCode: 500,
        body: "Internal Server Error",
      };
    }
  }
}

const aws = require('aws-sdk');
const dynamoDB = new aws.DynamoDB.DocumentClient();

const handler = new Handler({
  dynamoDbSvc: dynamoDB
});
module.exports = handler.main.bind(handler);
