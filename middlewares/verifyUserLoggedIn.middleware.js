const jwt = require('jsonwebtoken')
require('dotenv').config()
const apiSecret = process.env.SECRET

const verifyUserLoggedIn = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(403).json({ message: 'Invalid Token' })
  }
  try {
    const decode = jwt.verify(token, apiSecret)
    req.userId = {
      userId: decode.userId,
    }
    return next()
  } catch (error) {
    res.json({
      success: false,
      message: 'Unable to decrypt data from token.',
      errorMessage: error.message,
    })
  }
}

module.exports = verifyUserLoggedIn
