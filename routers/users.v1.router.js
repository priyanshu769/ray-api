const express = require('express')
const router = express.Router()
const {extend} = require('lodash')

// Model
const { User } = require('../models/user.model')

router
  .route('/')
  .get(async (req, res) => {
    try {
      const users = await User.find({})
      res.json({ success: true, users })
    } catch (error) {
      res.json({
        success: false,
        message: 'Unable to get User',
        errorMessage: error.message,
      })
    }
  })
  .post(async (req, res) => {
    const user = req.body
    try {
      const userToAdd = new User(user)
      const userAdded = await userToAdd.save()
      res.json({ success: true, userAdded })
    } catch (error) {
      res.json({
        success: false,
        message: "User wasn't posted",
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
    req.user = user
    next()
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
    let user = req.user
    user = extend(user, userUpdate)
    user = await user.save()
    res.json({ success: true, user })
  })

module.exports = router
