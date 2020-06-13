const resolvers = {
  //GET
  Query: {
    async getHero(root, args, context, info) {
      return 'Hello Word!'
    }
  },
  //POST (update, create, remove)
  Mutation: {
    async createHero(root, args, context, info) {
      return 'Hello Word!'
    }
  }
}

module.exports = resolvers;
