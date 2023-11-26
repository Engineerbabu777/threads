const express = require('express')
const {
  createPost,
  getAllPosts,
  updateLikes,
  addReplies,
  updateReplyLikes,
  deletePost
  //   updateLikes,
  //   addReplies,
  //   updateReplyLikes,
  //   addReply,
  //   updateRepliesReplyLike,
  //   deletePost,
} = require('../controllers/post')
const { isAuthenticatedUser } = require('../middleware/auth')

const router = express.Router()

router.route('/create-post').post(createPost)

router.route('/get-all-posts').get(getAllPosts)

router.route('/update-likes').put(updateLikes)

router.route('/add-replies').put(addReplies)

// router.route("/add-reply").put(addReply);

router.route('/update-replies-react').put(updateReplyLikes)

// router
//   .route("/update-reply-react")
//   .put(isAuthenticatedUser, updateRepliesReplyLike);

router.route("/delete-post/:id").delete(deletePost);

module.exports = router
