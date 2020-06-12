const HeroRepository = require('./../repositories/heroRepository');
const HeroService = require('./../service/heroService');

async function createInstance() {
  const repository = new HeroRepository();
  return new HeroService(repository);
}

module.exports = { createInstance };
