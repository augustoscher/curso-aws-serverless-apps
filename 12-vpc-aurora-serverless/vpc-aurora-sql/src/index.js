const {
  HeroSchema,
  sequelize
} = require('./database');

const handler = async event => {
  console.log('oi')
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.log('Unable to connect to the database', error.stack);
    return {
      statusCode: 500,
      body: 'Internal Server Error'
    }
  }
}

exports.handler = handler;
