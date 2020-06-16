const resolvers = {
  //GET
  Query: {
    async getSkill(root, args, context, info) {
      return context.Skill.findAll(args)
    }
  },
  //POST (update, create, remove)
  Mutation: {
    async createSkill(root, args, context, info) {
      const { id } = await context.Skill.create(args);
      return id;
    }
  }
}

module.exports = resolvers;
