class BaseService {
  constructor({ repository }) {
    this.repository = repository;
  }

  async create(item) {
    this.repository.create(item);
  }

  async findOne(id) {
    this.repository.findOne(id);
  }

  async findOne(id) {
    this.repository.findOne(id);
  }

  async findAll(query) {
    this.repository.findAll(query);
  }
}

module.exports = BaseService;
