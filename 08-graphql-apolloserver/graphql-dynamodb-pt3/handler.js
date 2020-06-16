'use strict';

const { ApolloServer, gql } = require('apollo-server-lambda');

const setupDynamoDBClient = require('./src/core/util/setupDynamoDB');
setupDynamoDBClient();

const HeroFactory = require('./src/core/factories/heroFactory');
const SkillFactory = require('./src/core/factories/skillFactory');

const isLocal = process.env.IS_LOCAL;

const schema = require('./src/graphql')

 
const server = new ApolloServer({
  schema,
  context: async() => ({
    Hero: await HeroFactory.createInstance(),
    Skill: await SkillFactory.createInstance()
  }),
  introspection: isLocal,
  playground: isLocal,
  formatError(error){
    console.log('Global Error Logger: ', error);
    return error;
  },
  formatResponse(response){
    console.log('Global Response Logger: ', response);
    return response;
  }
});
 
exports.handler = server.createHandler({
  cors: {
    origin: '*',
  },
});



// async function main() {
//   console.log('creating factories...');
//   const skillFactory = await SkillFactory.createInstance();
//   const heroFactory = await HeroFactory.createInstance();

//   console.log('insert skill item...');
//   const skillId = `${new Date().getTime()}`;
//   await skillFactory.create({
//     id: skillId,
//     name: 'Mage',
//     value: 50
//   });

//   console.log('getting skill');
//   const skill = await skillFactory.findOne(skillId)
//   console.log('Skill:', skill);

//   console.log('getting all skills');
//   const allSkills = await skillFactory.findAll()
//   console.log('all skills', allSkills);

//   console.log('\n-----------------\n')

//   console.log('insert hero item...');
//   const heroId = `${new Date().getTime()}`;
//   await heroFactory.create({
//     id: heroId,
//     name: 'Doctor Strange',
//     skills: [skillId]
//   });

//   console.log('getting hero');
//   const hero = await heroFactory.findOne(heroId);
//   console.log('Hero:', hero);

//   console.log('getting all heroes');
//   const allHeroes = await heroFactory.findAll()
//   console.log('all heroes', allHeroes);

//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       hero: {
//         hero,
//         allHeroes
//       },
//       skill: {
//         skill,
//         allSkills
//       }
//     })
//   }
// }

// module.exports.test = main;
