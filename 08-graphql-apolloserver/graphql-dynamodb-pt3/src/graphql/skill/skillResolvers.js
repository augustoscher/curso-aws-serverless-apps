const resolvers = {
  //GET
  Query: {
    async getSkill(root, args, context, info) {
      return 'Hello Word!'
    }
  },
  //POST (update, create, remove)
  Mutation: {
    async createSkill(root, args, context, info) {
      return 'Hello Word!'
    }
  }
}

module.exports = resolvers;
