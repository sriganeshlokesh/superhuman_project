const express = require("express");
const router = express.Router();
const { protect, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { getOrder } = require("../controllers/order");

// @route GET /api/transaction/order/:transactionId/:userId
// @desc Get order by transactionId Route
// @access Private
router.get("/order/:transactionId/:id", protect, isAuth, getOrder);

// @route PARAM id
// @desc Get User By Id
// @access Public
router.param("id", userById);

module.exports = router;
