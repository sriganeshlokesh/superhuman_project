const { Order, CartItem } = require("../models/Order");

exports.orderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: "Order not found",
        });
      }
      req.order = order;
      next();
    });
};

// Create an Order
exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      return res.status(400).json({
        errors: "Order Not Processed",
      });
    });
};

// Get all orders
exports.getOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name address")
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          errors: "Order Not Processed",
        });
      } else {
        res.json(orders);
      }
    });
};

// Get Order Status
exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateOrderStatus = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId },
    { status: req.body.status },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Order not updated",
        });
      }
      res.json(order);
    }
  );
};
