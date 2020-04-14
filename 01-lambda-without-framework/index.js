async function handler(event, context) {
  console.log('Envs: ', JSON.stringify(process.env, null, 2));
  console.log('Event: ', JSON.stringify(event, null, 2))

  return {
    hello: "Word",
    hey: "Jude!"
  }
}

module.exports = {
  handler
}
