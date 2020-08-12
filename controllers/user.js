const User = require("../models/User");
const { Order } = require("../models/Order");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

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

exports.orderToHistory = (req, res, next) => {
  let history = [];
  req.body.order.products.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.quantity,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    { new: true }
  )
    .then((data) => {
      next();
    })
    .catch((error) => {
      return res.status(400).json({
        error: "Could not update User Purchase History",
      });
    });
};

// Get User Profile
exports.getProfile = (req, res) => {
  return res.json(req.profile);
};

// Get User Image
exports.getPhoto = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set("Content-Type", req.profile.photo.contentType);
    return res.send(req.profile.photo.data);
  }
  next();
};

// Update profile
exports.updateProfile = (req, res) => {
  const errors = {};
  console.log(req.body);
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    console.log(files);

    if (err) {
      errors.photo = "Image could not be uploaded";
      return res.status(400).json(errors);
    }

    let profile = req.profile;
    profile = _.extend(profile, fields);

    if (files.photo) {
      profile.photo.data = fs.readFileSync(files.photo.path);
      profile.photo.contentType = files.photo.type;
    }

    profile.save((err, result) => {
      if (err) {
        errors.profile = "Profile not updated";
        return res.status(400).json(errors);
      }
      res.json(result);
    });
  });
};

// Get Order History
exports.getOrderHistory = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "Orders not found",
        });
      } else {
        res.json(orders);
      }
    });
};

// Get All Customers
exports.getAllUsers = (req, res) => {
  let errors = {};

  User.find({ role: "0" })
    .select("-photo")
    .exec((err, users) => {
      if (err) {
        errors.user = "Users not found";
        return res.status(400).json(errors);
      }
      res.json(users);
    });
};
