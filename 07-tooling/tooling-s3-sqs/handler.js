'use strict';

const AWS = require('aws-sdk');

const host = process.env.LOCALSTACK_HOST || "localhost";
const s3Port = process.env.S3_PORT || "4572";
const s3Config = {
  s3ForcePathStyle: true,
  endpoint: new AWS.Endpoint(`http://${host}:${s3Port}`)
}

const S3 = new AWS.S3(s3Config);

module.exports.hello = async event => {
  const allBuckets = await S3.listBuckets().promise();
  console.log('found: ', allBuckets);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        allBuckets
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
