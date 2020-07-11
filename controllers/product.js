const fs = require("fs");
const Product = require("../models/Product");
const formidable = require("formidable");
const _ = require("lodash");
const validateProductInput = require("../validation/product");
const { default: validator } = require("validator");
const product = require("../validation/product");

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
    const { name, description, price, category, quantity } = fields;

    if (validator.isEmpty(name)) {
      errors.name = "Name field is required";
      return res.status(400).json(errors);
    }
    if (validator.isEmpty(description)) {
      errors.description = "Description field is required";
      return res.status(400).json(errors);
    }
    if (validator.isEmpty(price)) {
      errors.price = "Price field is required";
      return res.status(400).json(errors);
    }
    if (validator.isEmpty(category)) {
      errors.category = "Category field is required";
      return res.status(400).json(errors);
    }
    if (validator.isEmpty(quantity)) {
      errors.quantity = "Quantity field is required";
      return res.status(400).json(errors);
    }

    let product = new Product(fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      if (files.photo.size > 1000000) {
        errors.photo = "Image should be less than 1mb in size";
        return res.status(400).json(errors);
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        errors.product = "Product not created";
        return res.status(400).json(errors);
      }
      res.json(result);
    });
  });
};

// Add Product Info
exports.addInfo = (req, res) => {
  const { errors, isValid } = validateProductInput(req.body);

  // Check validation
  if (!isValid) {
    // Return any errors
    return res.status(400).json(errors);
  }
  Product.findById(req.params.productId).then((product) => {
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
    product.info = newInfo;
    product.save().then((product) => res.json(product));
  });
};

// Update Product Info
exports.updateInfo = (req, res) => {
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
    product = _.extend(product, fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      if (files.photo.size > 1000000) {
        errors.photo = "Image should be less than 1mb in size";
        return res.status(400).json(errors);
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        errors.product = "Product not created";
        return res.status(400).json(errors);
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
