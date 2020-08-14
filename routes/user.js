const express = require("express");
const router = express.Router();
const { protect, isAuth, isAdmin } = require("../controllers/auth");
const {
  userById,
  updateProfile,
  getProfile,
  getPhoto,
  getOrderHistory,
  getAllUsers,
} = require("../controllers/user");

const { getOrder } = require("../controllers/order");

//Test
router.get("/secret/:id", protect, isAuth, (req, res) => {
  res.json({
    user: req.profile,
  });
});

// @route GET /api/user/:id
// @desc GET User Profile route
// @access Private
router.get("/:id", protect, isAuth, getProfile);

// @route GET /api/user/photo/:id
// @desc Get product photo route
// @access Public
router.get("/photo/:id", getPhoto);

// @route GET /api/user/order/:id
// @desc Get User Order History route
// @access Private
router.get("/order/:id", protect, isAuth, getOrderHistory);

// @route GET /api/user/order/:id
// @desc Get User Order History route
// @access Private
router.get("/all/:id", protect, isAuth, isAdmin, getAllUsers);

// @route PUT /api/user/:id
// @desc Update User Profile route
// @access Private
router.put("/:id", protect, isAuth, updateProfile);

// @route PARAM id
// @desc Get User By Id
// @access Public
router.param("id", userById);

module.exports = router;
