const User = require("../models/User");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        errors: "User Not Found",
      });
    }
    req.profile = user;
    next();
  });
};
