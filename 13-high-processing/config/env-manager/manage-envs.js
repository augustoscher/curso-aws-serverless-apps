const AWS = require("aws-sdk");
const { variables, ssmPrefix } = require("./env");

const SSM = new AWS.SSM({
  region: variables.REGION.value,
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const promises = [];
  for (const [key, data] of Object.entries(variables)) {
    const { value, type } = data;
    if (!value) continue;

    console.log("scheduling insertion");
    const result = SSM.putParameter({
      Overwrite: true,
      Name: `${ssmPrefix}/${key}`,
      Type: type,
      Value: value
    }).promise();

    promises.push(result);
    await sleep(500); //evitar rate limit no AWS SSM
  }

  const result = await Promise.all(promises);
  console.log("result: ", result);
})();
