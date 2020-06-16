const resolvers = {
  Hero: {
    //não fazer isso na vida real
    //para cada Hero que for encontrado, essa function será chamada
    async skills(root, args, context) {
      const skills = root.skills.map(skill => context.Skill.findOne(skill))
      const results = await Promise.all(skills)
      //retorna varios arrays e nao queremos ter array de arrays
      const all = results.reduce((prev, next) => prev.concat(next), [])
      return all;
    }
  },
  //GET
  Query: {
    async getHero(root, args, context, info) {
      return context.Hero.findAll(args)
    }
  },
  //POST (update, create, remove)
  Mutation: {
    async createHero(root, args, context, info) {
      const { id } = await context.Hero.create(args);
      return id;
    }
  }
}

module.exports = resolvers;
