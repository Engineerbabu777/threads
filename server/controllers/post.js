const Post = require('../models/PostModel')
const ErrorHandler = require('../utils/ErrorHandler.js')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const UserModel = require('../models/UserModel.js')
const Notification = require('../models/NotificationModel')
const jwt = require('jsonwebtoken')

// create post
exports.createPost = catchAsyncErrors(async (req, res, next) => {
  try {
    // NO USER THEN NOT ALLOW TO POST!

    const post = new Post({
      title: req?.body?.title,
      image: req?.body?.image
        ? {
            public_id: req.body.image,
            url: req.body.image
          }
        : null,
      user: req?.body?.user,
      replies: req?.body?.replies
    })

    await post.save()

    res.status(201).json({
      success: true,
      post
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 400))
  }
})

// get all posts
exports.getAllPosts = catchAsyncErrors(async (req, res, next) => {
  try {
    const posts = await Post.find().sort({
      createdAt: -1
    })

    console.log({ posts })
    res.status(201).json({ success: true, posts })
  } catch (error) {
    return next(new ErrorHandler(error.message, 400))
  }
})

// add or remove likes
exports.updateLikes = async (req, res) => {
  try {
    // GET THE POST ID:
    const postId = req.body.postId
    // FIND THAT POST:
    const post = await Post.findById(postId)
    // IS-LIKED BEFORE?:
    const isLikedBefore = post.likes.find(
      item => item.userId === req.body.user._id
    )

    // IF LIKED BEFORE:
    if (isLikedBefore) {
      await Post.findByIdAndUpdate(postId, {
        // REMOVING ID OF USER: MEANS NEED TO UN-LIKE
        $pull: {
          likes: {
            userId: req.body.user?._id,
            userName: req.body.user.name.replace(' ', '').toLowerCase(),
            userAvatar: req.body.user.avatar.url
          }
        }
      })

      if (req.body.user._id !== post.user._id) {
        await Notification.deleteOne({
          'creator._id': req.body.user._id,
          userId: post.user._id,
          type: 'Like'
        })
      }

      res.status(200).json({
        success: true,
        message: 'Like removed successfully'
      })
    } else {
      // UPDATING THE POST LIKES!
      await Post.updateOne(
        { _id: postId },
        {
          $push: {
            likes: {
              name: req.body.user.name,
              userName: req.body.user.name.replace(' ', '').toLowerCase(),
              userId: req.body.user._id,
              userAvatar: req.body.user.avatar.url,
              postId
            }
          }
        }
      )

      if (req.body.user._id !== post.user._id) {
        await Notification.create({
          creator: req.body.user,
          type: 'Like',
          title: post.title ? post.title : 'Liked your post',
          userId: post.user._id,
          postId: postId
        })
      }

      res.status(200).json({
        success: true,
        message: 'Like Added successfully'
      })
    }
  } catch (error) {
    console.log(error)
    return next(new ErrorHandler(error.message, 400))
  }
}

// add replies in post
exports.addReplies = async (req, res) => {
  try {
    const postId = req.body.postId

    console.log({body:req.body});

    const replyData = {
      user: req.user,
      title: req.body.title,
      image: req.body.image
        ? {
            public_id: req.body.image,
            url: req.body.image
          }
        : null,
      likes: []
    }

    // Find the post by its ID
    let post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      })
    }

    // Add the reply data to the 'replies' array of the post
    post.replies.push(replyData)

    // Save the updated post
    await post.save()

    res.status(201).json({
      success: true,
      post
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({err:true,message:error.message})

  }
}

// add or remove likes on replies
exports.updateReplyLikes = async (req, res) => {
  try {
    const postId = req.body.postId
    const replyId = req.body.replyId
    const replyTitle = req.body.replyTitle

    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      })
    }

    // Find the reply in the 'replies' array based on the given replyId
    const reply = post.replies.find(reply => reply._id.toString() === replyId)

    if (!reply) {
      return res.status(404).json({
        success: false,
        message: 'Reply not found'
      })
    }

    const isLikedBefore = reply.likes.find(item => item.userId === req.body.user._id)

    if (isLikedBefore) {
      // If liked before, remove the like from the reply.likes array
      reply.likes = reply.likes.filter(like => like.userId !== req.body.user._id)

      if (req.user.id !== post.user._id) {
        await Notification.deleteOne({
          'creator._id': req.body.user._id,
          userId: post.user._id,
          type: 'Reply',
          postId: postId
        })
      }

      await post.save()

      return res.status(200).json({
        success: true,
        message: 'Like removed from reply successfully'
      })
    }

    // If not liked before, add the like to the reply.likes array
    const newLike = {
      name: req.body.user.name,
      userName: req.body.user.name.replace(' ','').toLowerCase(),
      userId: req.body.user._id,
      userAvatar: req.body.user.avatar.url
    }

    reply.likes.push(newLike)

    if (req.body.user._id !== post.user._id) {
      await Notification.create({
        creator: req.body.user,
        type: 'Like',
        title: replyTitle ? replyTitle : 'Liked your Reply',
        userId: post.user._id,
        postId: postId
      })
    }

    await post.save()

    return res.status(200).json({
      success: true,
      message: 'Like added to reply successfully'
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({err:true,message:error.message})
    // return next(new ErrorHandler(error.message, 400))
  }
}

// add reply in replies
exports.addReply = async (req, res) => {
  try {
    const replyId = req.body.replyId;
    const postId = req.body.postId;

    let myCloud;

    if (req.body.image) {
      myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "posts",
      });
    }

    const replyData = {
      user: req.user,
      title: req.body.title,
      image: req.body.image
        ? {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          }
        : null,
      likes: [],
    };

    // Find the post by its ID
    let post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Find the reply by it's ID
    let data = post.replies.find((reply) => reply._id.toString() === replyId);

    if (!data) {
      return next(new ErrorHandler("Reply not found", 401));
    }

    data.reply.push(replyData);

    // Save the updated post
    await post.save();

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
}

// add or remove likes on replies reply
exports.updateRepliesReplyLike = catchAsyncErrors(async (req, res, next) => {
  try {
    const postId = req.body.postId;
    const replyId = req.body.replyId;
    const singleReplyId = req.body.singleReplyId;
    const replyTitle = req.body.replyTitle;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Find the reply in the 'replies' array based on the given replyId
    const replyObject = post.replies.find(
      (reply) => reply._id.toString() === replyId
    );

    if (!replyObject) {
      return res.status(404).json({
        success: false,
        message: "Reply not found",
      });
    }

    // Find the specific 'reply' object inside 'replyObject.reply' based on the given replyId
    const reply = replyObject.reply.find(
      (reply) => reply._id.toString() === singleReplyId
    );

    if (!reply) {
      return res.status(404).json({
        success: false,
        message: "Reply not found",
      });
    }

    // Check if the user has already liked the reply
    const isLikedBefore = reply.likes.some(
      (like) => like.userId === req.user.id
    );

    if (isLikedBefore) {
      // If liked before, remove the like from the reply.likes array
      reply.likes = reply.likes.filter((like) => like.userId !== req.user.id);

      if (req.user.id !== post.user._id) {
        await Notification.deleteOne({
          "creator._id": req.user.id,
          userId: post.user._id,
          type: "Reply",
          postId: postId,
        });
      }

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Like removed from reply successfully",
      });
    }

    // If not liked before, add the like to the reply.likes array
    const newLike = {
      name: req.user.name,
      userName: req.user.userName,
      userId: req.user.id,
      userAvatar: req.user.avatar.url,
    };

    reply.likes.push(newLike);

    if (req.user.id !== post.user._id) {
      await Notification.create({
        creator: req.user,
        type: "Like",
        title: replyTitle ? replyTitle : "Liked your Reply",
        userId: post.user._id,
        postId: postId,
      });
    }

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Like added to reply successfully",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

// delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(new ErrorHandler("Post is not found with this id", 404));
    }

  //  if(post.image?.public_id){
  //   await cloudinary.v2.uploader.destroy(post.image.public_id);
  //  }

   await Post.deleteOne({_id: req.params.id});

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error, 400));
  }
}
