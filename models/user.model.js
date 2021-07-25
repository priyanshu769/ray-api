const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Cannot create user without name',
  },
  email: {
    type: String,
    required: 'Cannot create user without a valid email',
  },
  password: {
    type: String,
    required: 'Cannot create user without a password',
  },
})

const User = mongoose.model('User', UserSchema)
module.exports = { User }
