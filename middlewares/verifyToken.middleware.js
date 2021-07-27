const jwt = require('jsonwebtoken')
require('dotenv').config()
const apiSecret = process.env.SECRET

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if (token === apiSecret) {
        return next()
    } else return res.status(401).json({message: "Unauthorised access, please provide valid token"})
}

module.exports = verifyToken