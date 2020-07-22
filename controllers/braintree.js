const User = require("../models/User");
const braintree = require("braintree");
require("dotenv").config();

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// Generate Brain Tree Token
exports.generateToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      return res.status(500).send(err);
    } else {
      res.json(response);
    }
  });
};

// Process Payment
exports.processPayment = (req, res) => {
  let nonceClient = req.body.paymentMethodNonce;
  let amountClient = req.body.amount;
  let newTransaction = gateway.transaction.sale(
    {
      amount: amountClient,
      paymentMethodNonce: nonceClient,
      options: {
        submitForSettlement: true,
      },
    },
    (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.json(result);
      }
    }
  );
};
