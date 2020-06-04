class Handler {

  getParamsFromEvent(event) {
    const [{ body, messageId }] = event.Records;
    return { body: JSON.parse(body), messageId };
  }

  async main(event) {
    const { body, messageId } = this.getParamsFromEvent(event);
    console.log("***event: ", JSON.stringify({ ...body, messageId, at: new Date().toISOString() }, null, 2))

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
