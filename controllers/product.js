const fs = require("fs");
const Product = require("../models/Product");
const formidable = require("formidable");
const _ = require("lodash");

// Get Product by Id
exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "Product not found",
      });
    }
    req.product = product;
    next();
  });
};

// Get a single product
exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

// Create a Product
exports.createProduct = (req, res) => {
  const errors = {};

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      errors.photo = "Image could not be uploaded";
      return res.status(400).json(errors);
    }
    // check for all fields
    let {
      name,
      description,
      company,
      price,
      category,
      quantity,
      flavour,
    } = fields;

    const productFields = {};
    productFields.name = name;
    productFields.description = description;
    productFields.price = price;
    productFields.category = category;
    productFields.quantity = quantity;
    productFields.company = company;
    productFields.flavour = flavour.split(",");
    let product = new Product(productFields);

    // 1kb = 1000
    // 1mb = 1000000000

    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        // errors.product = "Product not created";
        return res.status(400).json(err);
      }
      res.json(result);
    });
  });
};

// Add Product Like
exports.addProductLike = (req, res) => {
  let product = req.product;
  let user = req.profile;
  if (
    product.likes.filter((like) => like.user.toString() === user._id.toString())
      .length > 0
  ) {
    return res.status(400).json({
      error: "User has already liked this product.",
    });
  }
  // Add User ID to likes array
  product.likes.push({ user: user._id });
  product.save().then((product) => {
    res.json(product);
  });
};

// Add a Dislike to a product
exports.addProductDislike = (req, res) => {
  let product = req.product;
  let user = req.profile;
  if (
    product.dislikes.filter(
      (dislike) => dislike.user.toString() === user._id.toString()
    ).length > 0
  ) {
    return res.status(400).json({
      error: "User has already disliked this product.",
    });
  }
  // Add User ID to likes array
  product.dislikes.push({ user: user._id });
  product.save().then((product) => {
    res.json(product);
  });
};

// Unlike Product Like
exports.unlikeProduct = (req, res) => {
  let product = req.product;
  let user = req.profile;
  if (
    product.likes.filter((like) => like.user.toString() === user._id.toString())
      .length === 0
  ) {
    return res.status(400).json({
      error: "User has not liked this product.",
    });
  }
  // Remove like
  const removeIndex = product.likes
    .map((item) => item.user.toString())
    .indexOf(user._id);
  // Splice out of array;
  product.likes.splice(removeIndex, 1);
  product.save().then((product) => {
    res.json(product);
  });
};

// Unlike Product dislike
exports.unlikeDislike = (req, res) => {
  let product = req.product;
  let user = req.profile;
  if (
    product.dislikes.filter(
      (dislike) => dislike.user.toString() === user._id.toString()
    ).length === 0
  ) {
    return res.status(400).json({
      error: "User has not disliked this product.",
    });
  }
  // Remove like
  const removeIndex = product.dislikes
    .map((item) => item.user.toString())
    .indexOf(user._id);
  // Splice out of array;
  product.dislikes.splice(removeIndex, 1);
  product.save().then((product) => {
    res.json(product);
  });
};

// Add Comment to a Product
exports.addComment = (req, res) => {
  let product = req.product;
  let user = req.profile;

  const newComment = {
    text: req.body.text,
    name: user.name,
    user: user._id,
  };
  // Add to comments
  product.comments.unshift(newComment);
  product
    .save()
    .then((product) => res.json(product))
    .catch((err) => {
      return res.status(400).json({
        errors: err,
      });
    });
};

// Delete Comment
exports.deleteComment = (req, res) => {
  let product = req.product;
  let user = req.profile;
  if (
    product.comments.filter(
      (comment) => comment._id.toString() === req.params.commentId
    ).length === 0
  ) {
    return res.status(400).json({
      errors: "Comment does not exist",
    });
  }
  // Get Remove Index
  const removeIndex = product.comments
    .map((item) => item._id.toString())
    .indexOf(req.params.commentId);

  // Splice out of array
  product.comments.splice(removeIndex, 1);
  product.save().then((product) => {
    res.json(product);
  });
};

// Add Product Info
exports.addInfo = (req, res) => {
  let product = req.product;
  const newInfo = {
    protein: req.body.protein,
    fat: req.body.fat,
    carbohydrate: req.body.carbohydrate,
    cholestrol: req.body.cholestrol,
    sodium: req.body.sodium,
    sugar: req.body.sugar,
    calories: req.body.calories,
    calcium: req.body.calcium,
    potassium: req.body.potassium,
  };
  if (JSON.stringify(product.info) === "{}") {
    product.info = newInfo;
    product.save().then((data) => {
      res.json(data);
    });
  } else {
    return res.status(400).json({
      errors: "Product Info already exists",
    });
  }
};

// Update Product Info
exports.updateInfo = (req, res) => {
  let product = req.product;
  console.log(req.body);
  const newInfo = {
    protein: req.body.protein,
    fat: req.body.fat,
    carbohydrate: req.body.carbohydrate,
    cholestrol: req.body.cholestrol,
    sodium: req.body.sodium,
    sugar: req.body.sugar,
    calories: req.body.calories,
    calcium: req.body.calcium,
    potassium: req.body.potassium,
  };
  let info = product.info;
  info = _.extend(info, newInfo);

  product.save().then((product) => {
    return res.json(product);
  });
};

//Update a Product
exports.updateProduct = (req, res) => {
  const errors = {};

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      errors.photo = "Image could not be uploaded";
      return res.status(400).json(errors);
    }

    let product = req.product;
    let {
      name,
      description,
      price,
      category,
      quantity,
      company,
      flavour,
    } = fields;
    if (flavour) {
      fields.flavour = flavour.split(",");
      product = _.extend(product, fields);
    } else {
      product = _.extend(product, fields);
    }
    console.log(fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  });
};

// Delete a Product
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.deleteOne((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Product not deleted",
      });
    }
    return res.json({
      message: "Product Deleted Successfully",
    });
  });
};

// Product by Sell and Arrival
// by sell: /products?sortBy=sold&order=desc&limit=4
// by arrival: /products?sortBy=createdAt&order=desc&limit=\u{1F3FD}
// If no parameters then we return all the products
exports.getAllProducts = (req, res) => {
  let errors = {};
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        errors.product = "Products not found";
        return res.status(400).json(errors);
      }
      res.json(products);
    });
};

// Get Related Products
exports.getRelated = (req, res) => {
  let errors = {};
  let limit = req.query.limit ? parseInt(req.query.limit) : 4;
  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, products) => {
      if (err) {
        errors.product = "Products not found";
        return res.status(400).json(errors);
      }
      res.json(products);
    });
};

// Get Categories Currently Used By Products
exports.getAllCategories = (req, res) => {
  let errors = {};
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      errors.product = "Categories not found";
      return res.status(400).json(errors);
    }
    res.json(category);
  });
};

// Get Products by Search
exports.getSearchProduct = (req, res) => {
  let errors = {};
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        error.product = "Products not found";
        return res.status(400).json(errors);
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

// Get Product Photo
exports.getPhoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.listSearch = (req, res) => {
  // create query object to hold search value and category value
  const query = {};
  // assign search value to query.name
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
    // assigne category value to query.category
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }
    // find the product based on query object with 2 properties
    // search and category
    Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(products);
    }).select("-photo");
  }
};

exports.getInfo = (req, res) => {
  let product = req.product;
  if (product.info) {
    return res.json(product.info);
  } else {
    return res.status(400).json({
      error: "Product Info Not Found",
    });
  }
};

// Decrease Product Quantity Middleware
exports.decreaseQuantity = (req, res, next) => {
  let bulkOps = req.body.order.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  Product.bulkWrite(bulkOps, {}, (error, products) => {
    if (error) {
      return res.status(400).json({
        error: "Could not update product",
      });
    }
    next();
  });
};

// Get Product Comments
exports.getComments = (req, res) => {
  let product = req.product;
  return res.json(product.comments);
};
