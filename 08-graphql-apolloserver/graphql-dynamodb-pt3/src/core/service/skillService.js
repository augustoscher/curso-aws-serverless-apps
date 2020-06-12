const BaseService = require('./baseService');

class SkillService extends BaseService {
  constructor(repository) {
    super({ repository })
  }
}

module.exports = SkillService;
