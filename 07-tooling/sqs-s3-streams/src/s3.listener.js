// When S3 csv file is posted, this lambda will be called
class Handler {
  async main(event) {
    console.log('**s3 event: ', JSON.stringify(event, null, 2))
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
