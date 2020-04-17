class Handler {
  async main() {
    try {
      return {
        statusCode: 200,
        body: "ok",
      };
    } catch (error) {
      console.log("Error: ", error.stack);
      return {
        statusCode: 500,
        body: "Internal Server Error",
      };
    }
  }
}

const handler = new Handler();
module.exports = handler.main.bind(handler);
