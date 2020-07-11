const express = require("express");
const router = express.Router();

const {
  createProduct,
  addInfo,
  productById,
  getProduct,
  deleteProduct,
  updateProduct,
  updateInfo,
  getAllProducts,
  getRelated,
  getAllCategories,
  getSearchProduct,
  getPhoto,
} = require("../controllers/product");
const { protect, isAdmin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

// @route GET /api/product/read/:productId
// @desc Get a single product route
// @access Public
router.get("/read/:productId", getProduct);

// @route GET /api/product/related/:productId
// @desc Get related products route
// @access Public
router.get("/related/:productId", getRelated);

// @route GET /api/product/products
// @desc Get all the products route
// @access Public
router.get("/products", getAllProducts);

// @route GET /api/product/category
// @desc Get all the product categories route
// @access Public
router.get("/category", getAllCategories);

// @route GET /api/product/photo
// @desc Get product photo route
// @access Public
router.get("/photo/:productId", getPhoto);

// @route POST /api/product/search
// @desc Get product by search route
// @access Public
router.post("/search", getSearchProduct);

// @route POST /api/product/create/:id
// @desc Create product route
// @access Private
router.post("/create/:id", protect, isAuth, isAdmin, createProduct);

// @route POST /api/product/info/:id/:productId
// @desc Add product info route
// @access Private
router.post("/info/:id/:productId", protect, isAuth, isAdmin, addInfo);

// @route PUT /api/product/:id/:productId
// @desc Update product route
// @access Private
router.put("/:productId/:id", protect, isAuth, isAdmin, updateProduct);

// @route PUT /api/product/info/:id/:productId
// @desc Update product info route
// @access Private
router.put("/info/:productId/:id", protect, isAuth, isAdmin, updateInfo);

// @route DELETE /api/product/:id/:productId
// @desc Delete product route
// @access Private
router.delete("/:productId/:id", protect, isAuth, isAdmin, deleteProduct);

// Parameters

// @route PARAM id
// @desc Get User By Id
// @access Public
router.param("id", userById);

// @route PARAM productId
// @desc Get Product By Id
// @access Public
router.param("productId", productById);

module.exports = router;
