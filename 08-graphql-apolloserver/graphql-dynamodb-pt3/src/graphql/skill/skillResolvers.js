const resolvers = {
  //GET
  Query: {
    async getSkill(root, args, context, info) {
      return 'getting Skill!'
    }
  },
  //POST (update, create, remove)
  Mutation: {
    async createSkill(root, args, context, info) {
      return 'creating Skill!'
    }
  }
}

module.exports = resolvers;
