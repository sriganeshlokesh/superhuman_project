const express = require("express");
const router = express.Router();
const { register, login, logout, protect } = require("../controllers/auth");

// @route POST /api/auth/register
// @desc Register user route
// @access Public
router.post("/register", register);

// @route POST /api/auth/login
// @desc Login user route
// @access Public
router.post("/login", login);

// @route GET /api/auth/logout
// @desc Logout user route
// @access Public
router.get("/logout", logout);

module.exports = router;
