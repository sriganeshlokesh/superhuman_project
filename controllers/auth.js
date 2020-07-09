const User = require("../models/User");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Register User
exports.register = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already registered!";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      newUser
        .save()
        .then((user) => {
          user.salt = undefined;
          user.hashed_password = undefined;
          res.json(user);
        })
        .catch((err) => console.log(err));
    }
  });
};

// Login User
exports.login = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  // Find the user by email
  User.findOne({ email }).then((user) => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    } else {
      // Check for Password
      if (!user.authenticate(password)) {
        errors.password = "Incorrect password";
        return res.status(401).json(errors);
      }

      // Generate a token for authentication
      const payload = {
        id: user._id,
        name: user.name,
        avatar: user.avatar,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 3600,
      });
      res.cookie("token", token);

      // Return user and token to client
      const { _id, name, email, role } = user;
      return res.json({
        success: true,
        user: { _id, name, email, role },
        token: `Bearer ${token}`,
      });
    }
  });
};

//Logout User
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Logout Successful",
  });
};
