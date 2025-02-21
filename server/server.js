require("dotenv").config();
const express = require("express");
const app = express();
const pool = require("./src/config/DB");

const PORT = process.env.PORT || 4000;
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000/";

app.listen(PORT, async (err) => {
  if (err) throw err;
  await pool.connect();
  console.log(`> Ready server on ${SERVER_URL}`);
});
