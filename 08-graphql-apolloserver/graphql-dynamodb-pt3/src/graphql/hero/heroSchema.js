const typeDefinition = `
  type Hero {
    id: String
    name: String
    skills: [String]
  }

  type Query {
    getHero(
      id: String
      name: String
    ): [Hero]
  }

  type Mutation {
    createHero(
      name: String!
      skills: [String]!
    ): String
  }
`

module.exports = typeDefinition;
