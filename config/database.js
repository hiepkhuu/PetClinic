const config = require("./index");

const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;
// const sessionSecret = db.sessionSecret;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    // sessionSecret,
    dialect: "postgres",
  },
  // test: {
  //   dialect: "sqlite",
  //   DB_CONN: "sqlite.memory",
  //   logging: false,
  // },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
  }
};
