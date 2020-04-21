'use strict';

const settings = require('./config/serverless/settings');
const axios = require('axios');
const cheerio = require('cheerio')
class Handler {
  static async main(event) {
    console.log('at ', new Date().toISOString, JSON.stringify(event, null, 2));
    const { data } = await axios.get(settings.commitMessageUrl);
    
    const $ = cheerio.load(data);
    const [commitMessage] = await $("#content").text().trim().split('\n');
    console.log('Data: ', commitMessage);

    return {
      statusCode: 200,
      body: 'Oi'
    }
  } 
}

module.exports = {
  scheduler: Handler.main
} 