const { Pool } = require("pg");
const credentials = new Pool({
  user: "postgres",
  password: "engage",
  host: "localhost",
  port: 5432,
  database: "Backpack",
  ssl: false,
});
module.exports = credentials;
