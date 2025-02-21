const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: process.env.DB_CLIENT_PASS,
  port: process.env.DB_PORT || 5432,
  database: "demodb",
});

pool.on("connect", () => {
  console.log("> Ready PostgreSQL client");
});

module.exports = pool;
