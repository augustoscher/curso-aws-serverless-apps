const SkillRepository = require('./../repositories/skillRepository');
const SkillService = require('./../service/skillService');

async function createInstance() {
  const repository = new SkillRepository();
  return new SkillService(repository);
}

module.exports = { createInstance };
