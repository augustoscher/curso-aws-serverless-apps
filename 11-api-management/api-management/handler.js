"use strict";
const AWS = require('aws-sdk');
const apiGateway = new AWS.APIGateway();
const moment = require('moment');

const hello = async event => {
  return {
    statusCode: 200,
    body: "Hello Word",
  };
};

const usage = async event => {
  const {
    from,
    to,
    usagePlanId,
    keyId
  } = event.queryStringParameters;

  const usage = apiGateway.usage({
    endDate: moment(to).format('YYYY-MM-DD'),
    startDate: moment(from).format('YYYY-MM-DD'),
    usagePlanId,
    keyId
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(usage, null, 2),
  };
};

const usagePlans = async event => {
  const result = await apiGateway.getUsagePlans().promise();
  console.log('usage plans: ', result);

  return {
    statusCode: 200,
    body: JSON.stringify(result, 2, null)
  };
};

module.exports = {
  hello,
  usage,
  usagePlans
};
