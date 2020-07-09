const express = require("express");
const router = express.Router();
const { hello } = require("../controllers/auth");

// Test Route
router.get("/", hello);

module.exports = router;
