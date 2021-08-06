const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Cannot add a note without title',
  },
  content: {
    type: String,
    required: 'Cannot add a note without content',
  },
  color: {
    type: String,
    required: 'Cannot add a note without color info',
  },
  pinned: {
    type: Boolean,
    required: 'Cannot add a note without pinned info',
  },
  user: {
    type: Object,
    required: 'Cannot add note without user info',
    userId: {
      type: String,
      required: 'Cannot add note without userId',
    },
  },
})

const Note = mongoose.model('Note', NoteSchema)
module.exports = { Note }
