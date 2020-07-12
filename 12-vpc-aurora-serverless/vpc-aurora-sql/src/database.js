const Sequelize = require("sequelize");

const connection = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'mysql',
  pass: process.env.MYSQL_PASS  || 'mysql',
  database: process.env.MYSQL_DATABASE || 'heroes',
};

const sequelize = new Sequelize(
  connection.database,
  connection.user,
  connection.pass,
  {
    host: connection.host,
    dialect: "mysql",
    //case sensitve
    quoteIdentifiers: false,
    //deprecation warnings
    operatorAliases: false,
  }
);

const Heroes = sequelize.define(
  "heroes",
  {
    id: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      required: true,
    },
    power: {
      type: Sequelize.STRING,
      required: true,
    },
  },
  {
    tableName: 'TB_HEROES',
    freezeTableName: false,
    timestamps: false
  }
);

module.exports = {
  HeroSchema: Heroes,
  sequelize
}
