const resolvers = {
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
