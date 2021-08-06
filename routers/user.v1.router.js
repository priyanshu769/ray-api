const express = require('express')
const router = express.Router()
const { extend } = require('lodash')
const bcrypt = require('bcrypt')

// Model
const { User } = require('../models/user.model')

// Middleware
const verifyUserLoggedIn = require('../middlewares/verifyUserLoggedIn.middleware')
router.use(verifyUserLoggedIn)

router.route('/').get(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId.userId })
    res.json({ success: true, user })
  } catch (error) {
    res.json({
      success: false,
      message: 'Unable to get User',
      errorMessage: error.message,
    })
  }
})

router.param('id', async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
    if (!user) {
      res.json({ success: false, message: 'Unable to get Note' })
    }
    if (req.userId.userId === id) {
      req.user = user
      return next()
    }
    return res.json({
      sucess: false,
      message: 'Unable to fetch other users data',
    })
  } catch (error) {
    res.json({
      success: false,
      message: 'Unable to retrieve user',
      errorMessage: error.message,
    })
  }
})

router
  .route('/:id')
  .get((req, res) => {
    let user = req.user
    res.json({ success: true, user })
  })
  .post(async (req, res) => {
    const userUpdate = req.body
    const salt = await bcrypt.genSalt(10)
    userUpdate.password = await bcrypt.hash(userUpdate.password, salt)
    let user = req.user
    user = extend(user, userUpdate)
    user = await user.save()
    res.json({ success: true, user })
  })

module.exports = router
