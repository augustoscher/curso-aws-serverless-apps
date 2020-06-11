const BaseService = require('./baseService');

class HeroService extends BaseService {
  constructor(repository) {
    super({ repository })
  }
}

module.exports = HeroService;
