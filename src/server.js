const express = require("express");
require("dotenv").config();
const app = express();

app.get("/", (req, res) => res.send("Welcome to Med Connect API"));

const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

app.listen(port, host, () => {
  console.log(`Server listening on ${host}:${port}`);
});