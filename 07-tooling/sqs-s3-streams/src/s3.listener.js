// When S3 csv file is posted, this lambda will be called
const AWS = require('aws-sdk');

class Handler {

  constructor({ s3Svc, sqsSvc }) {
    this.s3Svc = s3Svc;
    this.sqsSvc = sqsSvc;
    this.queueName = process.env.SQS_QUEUE;
  }

  static getSdks() {
    const host = process.env.LOCALSTACK_HOST || "localhost";
    const s3Port = process.env.S3_PORT || "4572";
    const sqsPort = process.env.SQS_PORT || "4576";
    const isLocal = process.env.IS_LOCAL;
    const s3Endpoint = new AWS.Endpoint(`http://${host}:${s3Port}`);
    const sqsEndpoint = new AWS.Endpoint(`http://${host}:${sqsPort}`);

    const s3Config = {
      endpoint: s3Endpoint,
      s3ForcePathStyle: true
    }
    
    const sqsConfig = {
      endpoint: sqsEndpoint,
    }
    
    if (!isLocal) {
      delete s3Config.endpoint;
      delete sqsConfig.endpoint;
    }

    return {
      s3: new AWS.S3(s3Config),
      sqs: new AWS.SQS(sqsConfig)
    }
  }

  async getQueueUrl() {
    const { QueueUrl } = await this.sqsSvc.getQueueUrl({
      QueueName: this.queueName 
    }).promise();
    return QueueUrl;
  }

  getParamsFromEvent(event) {
    const [
      {
        s3: {
          bucket: { name },
          object: { key },
        },
      },
    ] = event.Records;
    return { name, key };
  }

  processDataOnDemand(queueUrl) {

  }

  async main(event) {
    // console.log('**s3 event: ', JSON.stringify(event, null, 2));
    const { name, key } = this.getParamsFromEvent(event);
    console.log('processing: ', name, key)

    try {
      console.log('geting queueURL...')
      const queueUrl = await this.getQueueUrl();
      
      this.s3Svc.getObject({ Bucket: name, Key: key })
        .createReadStream()
        .on("data", msg => console.log('on data: ', msg.toString()))
        .on("error", msg => console.log('on error: ', msg.toString()))
        .on("close", msg => console.log('on close: ', msg.toString()))
        .on("finish", msg => console.log('on finish'))



      return {
        statusCode: 200,
        body: 'S3 oi'
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

const { s3, sqs } = Handler.getSdks();
const handler = new Handler({
  sqsSvc: sqs,
  s3Svc: s3
});
module.exports = handler.main.bind(handler);
