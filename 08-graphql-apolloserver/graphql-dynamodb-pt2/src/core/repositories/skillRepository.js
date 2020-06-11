const BaseRepository = require('./baseRepository');
const schema = require('./schema/skillSchema');

class SkillRepository extends BaseRepository {
  constructor() {
    super({ schema })
  }
}

module.exports = SkillRepository;
