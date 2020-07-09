const express = require("express");
const app = express();
require("dotenv").config(); // make use of environment variables
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to Superhuman Project");
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
