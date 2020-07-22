const express = require("express");
const router = express.Router();

const { protect, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { generateToken, processPayment } = require("../controllers/braintree");

// @route GET /api/braintree/read/:userId
// @desc Get braintree clientToken route
// @access Private
router.get("/getToken/:id", protect, isAuth, generateToken);

// @route POST /api/braintree/payment/:userId
// @desc Payment Route
// @access Private
router.post("/payment/:id", protect, isAuth, processPayment);

// @route PARAM id
// @desc Get User By Id
// @access Public
router.param("id", userById);

module.exports = router;
