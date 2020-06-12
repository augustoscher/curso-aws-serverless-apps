const resolvers = {
  //GET
  Query: {
    getSkill(root, args, context, info) {
      return 'Hello Word!'
    }
  },
  //POST (update, create, remove)
  Mutation: {
    createSkill(root, args, context, info) {
      return 'Hello Word!'
    }
  }
}

module.exports = resolvers;
