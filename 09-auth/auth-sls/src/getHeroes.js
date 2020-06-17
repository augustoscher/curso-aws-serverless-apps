'use strict';

module.exports.public = async event => {
  console.log('Requesting public route...', new Date().toISOString());
  return {
    statusCode: 200,
    body: JSON.stringify(
      [
        {
          id: 1,
          name: "Flash",
          power: "Speed"
        }
      ],
      null,
      2
    ),
  };
};

module.exports.private = async event => {
  console.log('Requesting private route...', new Date().toISOString());
  return {
    statusCode: 200,
    body: JSON.stringify(
      [
        {
          id: 2,
          name: "Batman",
          power: "Money"
        }
      ],
      null,
      2
    ),
  };
};