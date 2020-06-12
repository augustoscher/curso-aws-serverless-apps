const resolvers = {
  //GET
  Query: {
    getHero(root, args, context, info) {
      return 'Hello Word!'
    }
  },
  //POST (update, create, remove)
  Mutation: {
    createHero(root, args, context, info) {
      return 'Hello Word!'
    }
  }
}

module.exports = resolvers;
