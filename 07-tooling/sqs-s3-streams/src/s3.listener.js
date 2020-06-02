// When S3 csv file is posted, this lambda will be called
const AWS = require('aws-sdk');

class Handler {
  static getSdks() {
    const host = process.env.LOCALSTACK_HOST || "localhost";
    const s3Port = process.env.S3_PORT || "4572";
    const sqsPort = process.env.SQS_PORT || "4576";
    const isLocal = process.env.IS_LOCAL;
    const s3Endpoint = new AWS.Endpoint(`http:${host}:${s3Port}`);
    const sqsEndpoint = new AWS.Endpoint(`http:${host}:${sqsPort}`);

    const s3Config = {
      endpoint: s3Endpoint,
      s3ForcePathStyle: true
    }

    const sqsConfig = {
      endpoint: sqsEndpoint,
    }
  }

  async main(event) {


    console.log('**s3 event: ', JSON.stringify(event, null, 2))
    try{
      return {
        statusCode: 200,
        body: 'S3'
      }

    } catch(e) {
      console.log('Error: ', e.stack);
      return {
        statusCode: 500,
        body: 'Internal Error'
      }
    }
  }
}

const handler = new Handler();
module.exports = handler.main.bind(handler);
