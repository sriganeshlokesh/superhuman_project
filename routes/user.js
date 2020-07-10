const express = require("express");
const router = express.Router();
const { protect, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

//Test
router.get("/secret/:id", protect, isAuth, (req, res) => {
  res.json({
    user: req.profile,
  });
});

// @route PARAM id
// @desc Get User By Id
// @access Public
router.param("id", userById);

module.exports = router;
