const typeDefinition = `
  type Skill {
    id: String
    name: String
    value: Int
  }

  type Query {
    getSkill(
      id: String
      name: String
      value: Int
    ): [Skill]
  }

  type Mutation {
    createSkill(
      name: String!
      value: Int!
    ): String
  }
`

module.exports = typeDefinition;
