'use strict';

const settings = require('./config/serverless/settings');
const axios = require('axios');

class Handler {
  static async main(event) {
    console.log('at ', new Date().toISOString, JSON.stringify(event, null, 2));
    const { data } = await axios.get(settings.commitMessageUrl);
    console.log('Data: ', data);

    return {
      statusCode: 200,
      body: 'Oi'
    }
  } 
}

module.exports = {
  scheduler: Handler.main
} 