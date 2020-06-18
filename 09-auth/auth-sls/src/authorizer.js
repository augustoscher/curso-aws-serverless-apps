const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
const { buildIAMPolicy } = require('../lib/util');

const myRoles = {
  // role name vs function name
  'heroes:list': 'private'
}

module.exports.handler = async event => {
  const token = event.authorizationToken;

  try {
    const decodedUser = jwt.verify(token, JWT_KEY);
    console.log(decodedUser);

    const userId = decodedUser.username;

    //objeto que será adicionado a todas as requests
    const authorizerContext = {
      user: JSON.stringify(decodedUser)
    }

    const policyDocument = buildIAMPolicy(userId, 'Allow', event.methodArn, authorizerContext);
    return policyDocument;
  } catch(error) {
    console.log('Auth error: ', error);
    return {
      //401 token invalido ou expirado
      //403 token sem permissão para acessar a função
      statusCode: 401,
      body: 'Unauthorized'
    }
  }
}
