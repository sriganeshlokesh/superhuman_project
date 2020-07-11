const express = require("express");
const router = express.Router();

const {
  createCategory,
  categoryById,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
} = require("../controllers/category");
const { protect, isAdmin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

// @route GET /api/category/:categoryId
// @desc Get category route
// @access Private
router.get("/:categoryId", getCategory);

// @route POST /api/category/create
// @desc Create category route
// @access Private
router.post("/create/:id", protect, isAuth, isAdmin, createCategory);

// @route PUT /api/category/:categoryId
// @desc Update category route
// @access Private
router.put("/:categoryId/:id", protect, isAuth, isAdmin, updateCategory);

// @route DELETE /api/category/create
// @desc Create category route
// @access Private
router.delete("/:categoryId/:id", protect, isAuth, isAdmin, deleteCategory);

// @route GET /api/category/all/category
// @desc Get all categories route
// @access Public
router.get("/all/category", getAllCategory);

// @route PARAM id
// @desc Get User By Id
// @access Public
router.param("id", userById);

// @route PARAM categoryId
// @desc Get Category By Id
// @access Public
router.param("categoryId", categoryById);

module.exports = router;
