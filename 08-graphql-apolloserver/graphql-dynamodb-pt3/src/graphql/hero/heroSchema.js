//n e a melhor pratica criar um outro tipo e 
//retornar os detalhes das skills
const typeDefinition = `
  type Skill {
    id: String,
    name: String
  }

  type Hero {
    id: String
    name: String
    skills (id: String): [Skill]
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
