const { promisify } = require('util');

class BaseRepository {
  constructor({ schema }) {
    this.schema = schema;
  }

  //creates item on dynamodb with dynamoose
  async create(item) {
    //convert in promise and calls resulted function
    return promisify(this.schema.create)(item)
  }

  //dynamodb query: used when we have the key (id)
  async findOne(id) {
    return promisify(this.schema.query)({ id: { eq: id } })
  }
  
  //dynamodb scan: used when we dont have the key or we dont know the data
  async findAll(query) {
    return promisify(this.schema.scan)(query)
  }
}

module.exports = BaseRepository;