const { Sequelize } = require("sequelize");

const sequelizeOptions = {};

if (process.env.DBLOG === "true") {
  sequelizeOptions.logging = (...msg) => console.log("[SQL]: " + msg);
} else {
  sequelizeOptions.logging = false;
}

if (process.env.ENV == "dev") {
  
} else if (process.env.ENV == "prod") {
  sequelizeOptions.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }
}
const sequelize = new Sequelize(
  process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : `postgres://${process.env.PGUSER}:${process.env.PGPASS}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGNAME}`,
  {
    ...sequelizeOptions,
  }
);

async function prestart() {
  try {
    await sequelize.authenticate();
    if (process.env.SYNCDATABASE === "true") {
      await sequelize.sync({
        force: true,
      });
    }
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

prestart();

module.exports = sequelize;
