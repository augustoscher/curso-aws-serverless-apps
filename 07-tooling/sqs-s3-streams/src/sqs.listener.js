class Handler {
  async main(event) {
    console.log('**sqs event: ', JSON.stringify(event, null, 2))
    try{
      return {
        statusCode: 200,
        body: 'Sqs'
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
