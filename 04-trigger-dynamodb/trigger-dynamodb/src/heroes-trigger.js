const handler = {
  async main(event) {
    console.log("Event***", JSON.stringify(event, null, 2));
    return {
      statusCode: 200,
    };
  },
};

module.exports = handler.main.bind(handler);
