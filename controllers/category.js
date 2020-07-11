const Category = require("../models/Category");

// Get Category By Id
exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found",
      });
    }
    req.category = category;
    next();
  });
};

// Get a Category
exports.getCategory = (req, res) => {
  return res.json(req.category);
};

// Create a Category
exports.createCategory = (req, res) => {
  const category = new Category({
    name: req.body.name,
  });
  category
    .save()
    .then((category) => {
      if (!category) {
        return res.status(400).json({
          errors: "Category Not Created",
        });
      } else {
        return res.json(category);
      }
    })
    .catch((err) => console.log(err));
};

// Update Category
exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save().then((category) => {
    return res.json(category);
  });
};

// Delete Category
exports.deleteCategory = (req, res) => {
  const category = req.category;
  category.deleteOne((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Category not deleted",
      });
    }
    return res.json({
      message: "Category Deleted",
    });
  });
};

// Get all Categories
exports.getAllCategory = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json(data);
  });
};
