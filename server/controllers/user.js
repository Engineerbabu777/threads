const User = require('../models/UserModel')
const ErrorHandler = require('../utils/ErrorHandler.js')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const sendToken = require('../utils/jwtToken.js')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
require('dotenv').config()
// const cloudinary = require("cloudinary");
const Notification = require('../models/NotificationModel.js');
// Register user
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body

    console.log('YES-> ', req.body)

    let user = await User.findOne({ email })
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' })
    }

    user = await User.create({
      name,
      email,
      password,
      avatar: avatar?.secure_url
        ? { public_id: avatar?.public_id, url: avatar?.secure_url }
        : null
    })

    sendToken(user, 201, res)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

// Login User
exports.loginUser = async (req, res) => {
  try {
    console.log('backend -> 1')
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(404).json({
        message: 'INVALID DATA',
        error: true
      })
    }
    console.log('backend -> 2')

    const user = await User.findOne({ email }).select('+password')

    console.log('backend -> 3')

    console.log({ user })

    if (!user) {
      return res.status(404).json({
        message: 'USER NOT FOUND',
        error: true
      })
    }

    console.log('backend -> 4')

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
      return res.status(401).json({
        error: true,
        message: 'Invalid password!'
      })
    }

    console.log('backend -> 5')

    const token = jwt.sign(user?._id.toString(), '123456789')

    console.log('SENDING TOKEN: ', token)
    res.status(201).json({
      success: true,
      user,
      token
    })
  } catch (error) {
    console.log('ERROR LOGIN:', error.message)
    res.status(500).json({ error: true, message: 'FAILED USER LOAD', error })
  }
}

//  Log out user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite: 'none',
    secure: true
  })

  res.status(200).json({
    success: true,
    message: 'Log out success'
  })
})

//  Get user Details
exports.userDetails = async (req, res) => {
  // const user = await User.findById(req.user.id)

  try {
    const token = req.query.userId
    console.log(req.query)

    const user = jwt.verify(token, '123456789')

    const find = await UserModel.findById(user)

    if (!find?.email) {
      return res.status(404).json({ message: 'User Not Found', error: true })
    }

    res.status(200).json({
      success: true,
      user: find
    })
  } catch (err) {
    console.log('EROR: ', err.message)
    res.status(500).json({ error: true, message: 'FAILED USER LOAD', err })
  }
}

// get all users!
exports.getAllUsers = async (req, res) => {
  try {
    const loggedInuser = req.query.userId

    console.log({ loggedInuser })

    const user = jwt.verify(loggedInuser, '123456789')

    console.log({ user })

    const users = await User.find({ _id: { $ne: user } }).sort({
      createdAt: -1
    })

    console.log(1, { users })

    res.status(201).json({
      success: true,
      users
    })
  } catch (err) {
    console.log('GETTING USERS ERROR: ', err.message)
  }
}

// Follow and unfollow user
exports.followUnfollowUser = async (req, res) => {
  try {
    console.log('api hitted')
    const user = req.body.userId
    const { followUserId } = req.body

    const loggedInUser = await User.findById(user);

    const isFollowedBefore = loggedInUser.following.find(
      item => item.userId === followUserId
    )

    const loggedInUserId = loggedInUser._id

    if (isFollowedBefore) {
      // REMOVING THE FOLLOWERS OF THE FOLLOWED USER!!
      await User.updateOne(
        { _id: followUserId },
        { $pull: { followers: { userId: loggedInUserId } } }
      )
      // REMOVING THAT USER FROM MY FOLLOWINGS!
      await User.updateOne(
        { _id: loggedInUserId },
        { $pull: { following: { userId: followUserId } } }
      );

      await Notification.deleteOne({
        "creator._id": loggedInUserId,
        userId: followUserId,
        type: "Follow",
      });

      res.status(200).json({
        success: true,
        message: 'User unFollowed successfully'
      })
    } else {
      await User.updateOne(
        { _id: followUserId },
        { $push: { followers: { userId: loggedInUserId } } }
      );

      await User.updateOne(
        { _id: loggedInUserId },
        { $push: { following: { userId: followUserId } } }
      );

      await Notification.create({
        creator: req.user,
        type: "Follow",
        title: "Followed you",
        userId: followUserId,
      });

      res.status(200).json({
        success: true,
        message: 'User followed successfully'
      })
    }
  } catch (error) {
    console.log({error:error.message})
    return next(new ErrorHandler(error.message, 401))
  }
}
