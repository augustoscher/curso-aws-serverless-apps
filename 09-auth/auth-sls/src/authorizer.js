const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

const myRoles = {
  // role name vs function name
  'heroes:list': 'private'
}

module.exports = async event => {
  const token = event.authorizationToken;

  try {
    const decodedUser = jwt.verify(token, JWT_KEY);
    console.log(decodedUser);
    return null;
  } catch(error) {
    return {
      //401 token invalido ou expirado
      //403 token sem permissão para acessar a função
      statusCode: 401,
      body: 'Unauthorized'
    }
  }
}
