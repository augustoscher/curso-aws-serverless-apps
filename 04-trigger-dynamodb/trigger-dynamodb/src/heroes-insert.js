const uuid = require('uuid');

class Handler {
  constructor({ dynamoDbSvc }) {
    this.dynamoDbSvc = dynamoDbSvc;
    this.dynamoDbTable = process.env.DYNAMODB_TABLE;
  }

  prepareData(data) {
    const params = {
      TableName: this.dynamoDbTable,
      Item: {
        ...data,
        id: uuid.v1(),
        createdAt: new Date().toISOString()
      }
    }
    return params;
  }

  async insertItem(params) {
    return this.dynamoDbSvc.put(params).promise();
  }

  async main(event) {
    try {
      const data = JSON.parse(event.body);
      const dbParams = this.prepareData(data);
      await this.insertItem(dbParams);

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
