const { HeroSchema, sequelize } = require("./database");

const faker = require("faker");

const handler = async (event) => {
  console.log("oi");
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("Unable to connect to the database", error.stack);
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }

  await HeroSchema.sync();
  const result = await HeroSchema.create({
    name: faker.name.title(),
    power: faker.name.jobTitle(),
  });

  const all = await HeroSchema.findAll({
    raw: true,
    attributes: ["id", "name", "power"],
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      result,
      all,
    }),
  };
};

exports.handler = handler;
