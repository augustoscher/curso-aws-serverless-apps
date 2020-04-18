const uuid = require('uuid');
const Joi = require('@hapi/joi');
const decoratorValidator = require('./util/decoratorValidator');
const globalEnum = require('./util/globalEnum');

class Handler {
  constructor({ dynamoDbSvc }) {
    this.dynamoDbSvc = dynamoDbSvc;
    this.dynamoDbTable = process.env.DYNAMODB_TABLE;
  }

  static validator() {
    return Joi.object({
      name: Joi.string().max(100).min(2).required(),
      power: Joi.string().max(20).required(),
      city: Joi.string()
    })
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

  handlerSuccess(data) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(data)
    }
    return response
  }

  handlerError(data) {
    const response = {
      statusCode: data.statusCode || 501,
      header: {'Content-Type': 'text/plain'},
      body: 'Couldn\'t create item.'
    }
    return response
  }

  async insertItem(params) {
    return this.dynamoDbSvc.put(params).promise();
  }

  async main(event) {
    try {
      //decorator modifica o body, valida e converte para JSON
      const data = event.body;

      const dbParams = this.prepareData(data);
      await this.insertItem(dbParams);
      return this.handlerSuccess(dbParams.Item)
    } catch (error) {
      console.log("Deu ruim: ", error.stack);
      return this.handlerError({ statusCode: 500 });
    }
  }
}

const aws = require('aws-sdk');
const dynamoDB = new aws.DynamoDB.DocumentClient();

const handler = new Handler({
  dynamoDbSvc: dynamoDB
});

module.exports = decoratorValidator(
  handler.main.bind(handler),
  Handler.validator(),
  globalEnum.ARG_TYPE.BODY
);
