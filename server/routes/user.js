const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  userDetails,
  getAllUsers,
  followUnfollowUser,
  getNotification,
  getUser,
} = require("../controllers/user");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/registration").post(createUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/me").get(userDetails);

router.route('/users').get(getAllUsers);

router.route('/add-user').put(followUnfollowUser);

router.route("/get-notifications").get(getNotification);

router.route("/get-user/:id").get(getUser);

// router.route("/update-avatar").put(isAuthenticatedUser, updateUserAvatar);

// router.route("/update-profile").put(isAuthenticatedUser, updateUserInfo);


module.exports = router;
