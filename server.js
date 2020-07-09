const express = require("express");
const app = express();
require("dotenv").config(); // make use of environment variables
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const auth = require("./routes/auth");

// Connect to Database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("Connected to Database");
  });

// Routes Middleware
app.use("/api/auth", auth);

app.get("/", (req, res) => {
  res.send("Welcome to Superhuman Project");
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
