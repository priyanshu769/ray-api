const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secretKey = process.env.SECRET

// Model
const { User } = require('../models/user.model')

router.route('/').post(async (req, res) => {
  try {
    const newUser = req.body
    const verifyUser = new User(newUser)
    const user = await User.findOne({ email: verifyUser.email })
    if (user) {
      return res.json({
        success: false,
        message: 'There is already an user with this email.',
      })
    }
    try {
      const salt = await bcrypt.genSalt(10)
      verifyUser.password = await bcrypt.hash(verifyUser.password, salt)
      const savedUser = await verifyUser.save()
      const token = jwt.sign({ userId: savedUser._id }, secretKey)
      return res.json({
        success: true,
        message: 'Signup successful!',
        user: savedUser,
        token,
      })
    } catch (error) {
      res.json({
        success: false,
        message: 'Unable to signup.',
        errorMessage: error.message,
      })
    }
  } catch (err) {
    res.json({
      success: false,
      message: 'Some error occured',
      errorMessage: err.message,
    })
  }
})

module.exports = router
