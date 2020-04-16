'use strict';

class Handler {
  constructor({ rekoSvc }){
    this.rekoSvc = rekoSvc
  }

  async main(event) {
    try {
      return {
        statusCode: 200,
        body: 'Hi'
      }
    } catch (error) {
      console.log('Error: ', error.stack);
      return {
        statusCode: 500,
        body: 'Internal Server Error'
      }
    }
  }
}

const aws = require('aws-sdk');
const reko = aws.Rekognition();

const handler = new Handler({
  rekoSvc = reko
});

module.exports.main = handler.main.bind(handler)
