const resolvers = {
  //GET
  Query: {
    async getHero(root, args, context, info) {
      return 'getting hero!'
    }
  },
  //POST (update, create, remove)
  Mutation: {
    async createHero(root, args, context, info) {
      return 'creating hero!'
    }
  }
}

module.exports = resolvers;
