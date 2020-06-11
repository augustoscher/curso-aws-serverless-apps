const BaseRepository = require('./baseRepository');
const schema = require('./schema/heroSchema');

class HeroRepository extends BaseRepository {
  constructor() {
    super({ schema })
  }
}

module.exports = HeroRepository;
