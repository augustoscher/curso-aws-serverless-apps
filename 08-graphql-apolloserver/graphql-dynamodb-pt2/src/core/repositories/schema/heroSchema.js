const dynamoose = require('dynamoose');
const Schema = dynamoose.Schema;

const schema = new Schema({
  id: {
    type: String,
    required: true,
    hashKey: true
  },
  name: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    required: true
  }]
});

const model = dynamoose.model(process.env.HEROES_TABLE, schema);

module.exports = model;