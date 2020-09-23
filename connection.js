const { Pool } = require("pg");
const credentials = new Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5433,
  database: "Backpack",
  ssl: false,
});
module.exports = credentials;
