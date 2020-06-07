'use strict';

const { ApolloServer, gql } = require('apollo-server-lambda');
const AWS = require('aws-sdk');

function setupDynamoDB() {
  if (!process.env.IS_LOCAL)
    return new AWS.DynamoDB.DocumentClient();

  const host = process.env.LOCALSTACK_HOST;
  const port = process.env.DYNAMODB_PORT;
  console.log('running dynamodb locally! ', host, port)

  return new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    accessKeyId: "DEFAULT_ACCESS_KEY",
    secretAccessKey: "DEFAULT_SECRET",
    endpoint: new AWS.Endpoint(`http://${host}:${port}`)
  });
}

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
