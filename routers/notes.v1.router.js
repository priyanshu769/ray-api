const express = require('express')
const router = express.Router()

// Model
const { Note } = require('../models/note.model')

router
  .route('/')
  .get(async (req, res) => {
    try {
      const notes = await Note.find({})
      res.json({ success: true, notes })
    } catch (error) {
      res.json({
        success: false,
        message: 'Unable to fetch notes',
        errorMessage: error.message,
      })
    }
  })
  .post(async (req, res) => {
    const note = req.body
    try {
      const noteToAdd = new Note(note)
      console.log(noteToAdd)
      const noteAdded = await noteToAdd.save()
      res.json({ success: true, noteAdded })
    } catch (error) {
      res.json({
        success: false,
        message: 'Unable to add new note',
        errorMessage: error.message,
      })
    }
  })

module.exports = router
