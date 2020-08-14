const { Order, CartItem } = require("../models/Order");
const nodemailer = require("nodemailer");
let transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_NAME,
    pass: process.env.PASSWORD,
  },
});

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
  console.log(order);
  order.save((err, data) => {
    if (err) {
      return res.status(400).json({
        errors: "Order Not Processed",
      });
    }
    const emailData = {
      to: "superhumanproject2020@gmail.com", // admin
      from: "noreply@superhumanproject.com",
      subject: `A new order is received`,
      html: `
        <h1>Hey Admin, Somebody just made a purchase at Superhuman Project</h1>
        <h2>Customer name: ${order.user.name}</h2>
        <h2>Customer address: ${order.address}</h2>
        <h2>User's purchase history: ${order.user.history.length} purchase</h2>
        <h2>User's email: ${order.user.email}</h2>
        <h2>Total products: ${order.products.length}</h2>
        <h2>Transaction ID: ${order.transaction_id}</h2>
        <h2>Order status: ${order.status}</h2>
        <h2>Product details:</h2>
        <hr />
        ${order.products
          .map((p) => {
            return `<div>
                    <h3>Product Name: ${p.name}</h3>
                    <h3>Product Price: ${p.price}</h3>
                    <h3>Product Quantity: ${p.count}</h3>
            </div>`;
          })
          .join("--------------------")}
        <h2>Total order cost: ${order.amount}<h2>
        <p>Login to your dashboard</a> to see the order in detail.</p>
    `,
    };

    transport.sendMail(emailData, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Message Sent: " + info.response);
      }
    });

    const userEmail = {
      to: order.user.email,
      from: "noreply@superhumanproject.com",
      subject: `You order is being processed`,
      html: `
          <h1>Hey ${req.profile.name}, Thank you for shopping with us.</h1>
          <h2>Total products: ${order.products.length}</h2>
          <h2>Transaction ID: ${order.transaction_id}</h2>
          <h2>Order status: ${order.status}</h2>
          <h2>Product details:</h2>
          <hr />
          ${order.products
            .map((p) => {
              return `<div>
                      <h3>Product Name: ${p.name}</h3>
                      <h3>Product Price: ${p.price}</h3>
                      <h3>Product Quantity: ${p.count}</h3>
              </div>`;
            })
            .join("--------------------")}
          <h2>Total order cost: ${order.amount}<h2>
          <p>Thank your for shopping with us.</p>
      `,
    };
    transport.sendMail(userEmail, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Message Sent: " + info.response);
      }
    });
    res.json(data);
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

// Get order by transaction id
exports.getOrder = (req, res) => {
  Order.findOne({ transaction_id: req.params.transactionId }).exec(
    (err, data) => {
      if (err) {
        return res.status(400).json({
          errors: "Order not found",
        });
      } else {
        res.json(data);
      }
    }
  );
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

// Delete Order
exports.deleteOrder = (req, res) => {
  let order = req.order;
  order.deleteOne((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Order not deleted",
      });
    }
    return res.json({
      message: "Order Deleted Successfully",
    });
  });
};
