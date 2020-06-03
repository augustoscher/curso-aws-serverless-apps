// When S3 csv file is posted, this lambda will be called
const AWS = require('aws-sdk');
const { Writable, pipeline } = require('stream');
const csvtojson = require('csvtojson');

// Quando um arquivo csv é adicionado no bucket, utilizamos streams para converter
// o arquivo para JSON e item a item adicioná-lo na fila do SQS

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
      s3ForcePathStyle: true,
    };

    const sqsConfig = {
      endpoint: sqsEndpoint,
    };

    if (!isLocal) {
      delete s3Config.endpoint;
      delete sqsConfig.endpoint;
    }

    return {
      s3: new AWS.S3(s3Config),
      sqs: new AWS.SQS(sqsConfig),
    };
  }

  async getQueueUrl() {
    const { QueueUrl } = await this.sqsSvc
      .getQueueUrl({
        QueueName: this.queueName,
      })
      .promise();
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
    const writableStream = new Writable({
      write: (chunk, encoding, done) => {
        const item = chunk.toString();
        console.log("sending.. ", item, "at ", new Date().toISOString());

        this.sqsSvc.sendMessage(
          {
            QueueUrl: queueUrl,
            MessageBody: item,
          },
          done
        );
      },
    });
    return writableStream;
  }

  async pipefyStreams(...args) {
    return new Promise((resolve, reject) => {
      //args são as n functions
      pipeline(...args, (error) => (error ? reject(error) : resolve()));
    });
  }

  async main(event) {
    const { name, key } = this.getParamsFromEvent(event);
    console.log("processing: ", name, key);

    try {
      const queueUrl = await this.getQueueUrl();

      //desta forma, o processo que ocasionar o erro primeiro, ja para a execução
      //e não precisa pegar o onfinish, onclose para retornar o handler
      await this.pipefyStreams(
        this.s3Svc.getObject({ Bucket: name, Key: key }).createReadStream(),
        csvtojson(),
        this.processDataOnDemand(queueUrl)
      );

      console.log("process finished...", new Date().toISOString());

      return {
        statusCode: 200,
        body: "S3 oi",
      };
    } catch (e) {
      console.log("Error: ", e.stack);
      return {
        statusCode: 500,
        body: "Internal Error",
      };
    }
  }
}

const { s3, sqs } = Handler.getSdks();
const handler = new Handler({
  sqsSvc: sqs,
  s3Svc: s3
});
module.exports = handler.main.bind(handler);



// this.s3Svc.getObject({ Bucket: name, Key: key })
//   .createReadStream()
//   .on("data", msg => console.log('on data: ', msg.toString()))
//   .on("error", msg => console.log('on error: ', msg.toString()))
//   .on("close", msg => console.log('on close: ', msg.toString()))
//   .on("finish", msg => console.log('on finish'))

// this.s3Svc.getObject({ Bucket: name, Key: key })
//   .createReadStream()
//   .pipe(csvtojson())
//   .pipe(this.processDataOnDemand(queueUrl))