const Sequelize = require('sequelize');
const connection = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  pass: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
}

const sequelize = new Sequelize(
  connection.database,
  connection.user,
  connection.pass,
  {
    host: connection.host,
    dialect: 'mysql',
    //case sensitve
    quoteIdentifiers: false,
    //deprecation warnings
    operatorAliases: false,
  }
)