const express = require("express");
const router = express.Router();

const { protect, isAuth, isAdmin } = require("../controllers/auth");
const { userById, orderToHistory } = require("../controllers/user");
const {
  createOrder,
  getOrders,
  getOrderStatus,
  orderById,
  updateOrderStatus,
  deleteOrder,
  getOrder,
} = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

// @route POST /api/order/create/:userId
// @desc Create Order Route
// @access Private
router.post(
  "/create/:id",
  protect,
  isAuth,
  orderToHistory,
  decreaseQuantity,
  createOrder
);

// @route GET /api/order/list/:userId
// @desc Get all orders Route
// @access Private
router.get("/list/:id", protect, isAuth, isAdmin, getOrders);

// @route GET /api/order/status/:userId
// @desc Get all orders status Route
// @access Private
router.get("/status/:id", protect, isAuth, isAdmin, getOrderStatus);

// @route PUT /api/order/:orderId/status/:userId
// @desc Update order status Route
// @access Private
router.put("/:orderId/status/:id", protect, isAuth, isAdmin, updateOrderStatus);

// @route DELETE /api/order/:orderId/:userId
// @desc Delete Order route
// @access Private
router.delete("/:orderId/:id", protect, isAuth, isAdmin, deleteOrder);

// @route PARAM id
// @desc Get User By Id
// @access Public
router.param("id", userById);

// @route PARAM id
// @desc Get Order By Id
// @access Public
router.param("orderId", orderById);

module.exports = router;
