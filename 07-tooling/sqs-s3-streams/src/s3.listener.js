class Handler {
  async main(event) {
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
