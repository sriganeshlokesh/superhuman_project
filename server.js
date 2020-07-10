const express = require("express");
const app = express();
require("dotenv").config(); // make use of environment variables
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");
const user = require("./routes/user");

// Body Parsor Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Morgan Middleware
app.use(morgan("dev"));

// Cookie Parser Middleware
app.use(cookieParser());

// Routes Middleware
app.use("/api/auth", auth);
app.use("/api/user", user);

app.get("/", (req, res) => {
  res.send("Welcome to Superhuman Project");
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
