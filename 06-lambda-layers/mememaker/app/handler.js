"use strict";

const { exec } = require('child_process');
const { promisify } = require('util');
const shell = promisify(exec);

class Handler {
  constructor() {}

  async main(event) {
    const response = await shell(
      'gm identify --verbose ./resources/img/homer.jpg'
    )
    console.log({ response })
    try {
      return {
        statusCode: 200,
        body: response.stdout,
      };
    } catch (error) {
      console.error("error***", error.stack);
      return {
        statusCode: 500,
        body: error.stack,
      };
    }
  }
}

const handler = new Handler();
module.exports = { mememaker: handler.main.bind(handler) }