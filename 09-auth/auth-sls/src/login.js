const users = require('../db/users.json');
const JWT_KEY = process.env.JWT_KEY;
const { sign } = require("jsonwebtoken");

const login = async event => {
  console.log('Login invoked...', new Date().toISOString(), event.body);

  const { username, password } = JSON.parse(event.body);

  const user = users.find(
    usr =>
      usr.username.toLowerCase() === username.toLowerCase() &&
      usr.password === password
  );

  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized'})
    }
  }

  const signUser = {
    scopes: user.scopes,
    username: user.username
  }

  const token = sign({ user: signUser }, JWT_KEY, { expiresIn: '5m' });

  return {
    statusCode: 200,
    body: JSON.stringify({
      token
    })
  }
}

module.exports = login;
