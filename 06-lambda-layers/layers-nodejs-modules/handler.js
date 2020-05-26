'use strict';
const moment = require('moment')
module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: moment().format()
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
