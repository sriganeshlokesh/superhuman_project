const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config(); // make use of environment variables
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const auth = require("./routes/auth");
const user = require("./routes/user");
const category = require("./routes/category");
const product = require("./routes/product");
const braintree = require("./routes/braintree");
const order = require("./routes/order");
const transaction = require("./routes/transaction");

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

// Cors Middleware
app.use(cors());

// Routes Middleware
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/category", category);
app.use("/api/product", product);
app.use("/api/braintree", braintree);
app.use("/api/order", order);
app.use("/api/transaction", transaction);

// Server Static Assets in Production
if (process.env.NODE_ENV === "production") {
  // Set Static Folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.send("Welcome to Superhuman Project");
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
