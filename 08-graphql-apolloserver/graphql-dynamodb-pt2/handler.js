'use strict';

const { ApolloServer, gql } = require('apollo-server-lambda');

const setupDynamoDBClient = require('./src/core/util/setupDynamoDB');
setupDynamoDBClient();

const HeroFactory = require('./src/core/factories/heroFactory');
const SkillFactory = require('./src/core/factories/skillFactory');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
 
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};
 
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
 
exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});

async function main() {
  console.log('creating factories...');
  const skillFactory = await SkillFactory.createInstance();
  const heroFactory = await HeroFactory.createInstance();

  console.log('insert skill item...');
  const skillId = `${new Date().getTime()}`;
  skillFactory.create({
    id: skillId,
    name: 'Mage',
    value: 50
  });

  console.log('getting skill item');
  const allSkills = await skillFactory.findAll()
  console.log('all skills', allSkills);

  console.log('\n-----------------\n')

  console.log('insert hero item...');
  const heroId = `${new Date().getTime()}`;
  heroFactory.create({
    id: heroId,
    name: 'Doctor Strange',
    skills: [skillId]
  });

  console.log('getting hero');
  const hero = await heroFactory.findOne(heroId);
  console.log('Hero:', hero);

  console.log('getting all heros');
  const allHeros = await heroFactory.findAll()
  console.log('all heros', allHeros);
}
