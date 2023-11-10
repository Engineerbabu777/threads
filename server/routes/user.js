const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  userDetails,
} = require("../controllers/user");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/registration").post(createUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/me").get(userDetails);

module.exports = router;
