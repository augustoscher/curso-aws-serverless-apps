'use strict';

const settings = require('./config/serverless/settings');
const axios = require('axios');
const cheerio = require('cheerio');
const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

class Handler {
  static async main(event) {
    console.log('at ', new Date().toISOString, JSON.stringify(event, null, 2));
    const { data } = await axios.get(settings.commitMessageUrl);
    
    const $ = cheerio.load(data);
    const [commitMessage] = await $("#content").text().trim().split('\n');

    const params = {
      TableName: settings.dbTableName,
      Item: {
        commitMessage,
        id: uuid.v1(),
        createdAt: new Date().toISOString()
      }
    }
    await dynamoDB.put(params).promise()

    return {
      statusCode: 200,
      body: commitMessage
    }
  } 
}

module.exports = {
  scheduler: Handler.main
}
