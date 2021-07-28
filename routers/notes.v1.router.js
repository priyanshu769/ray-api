const express = require('express')
const router = express.Router()
const { extend } = require('lodash')

// Model
const { Note } = require('../models/note.model')

// Middleware
const verifyUserLoggedIn = require('../middlewares/verifyUserLoggedIn.middleware')
router.use(verifyUserLoggedIn)

router
  .route('/')
  .get(async (req, res) => {
    try {
      const findByUserId = {user : {
        userId: req.userId.userId
      }}
      const notes = await Note.find(findByUserId)
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
router.param('id', async (req, res, next, id) => {
  try {
    const note = await Note.findById(id)
    if (!note) {
      res.json({success: false, message: 'Unable to get Note'})
    }
    req.note = note
    next()
  } catch (error) {
    res.json({
      success: false,
      message: 'Unable to retrieve note',
      errorMessage: error.message,
    })
  }
})

router
  .route('/:id')
  .get((req, res) => {
    let note = req.note
    res.json({ success: true, note })
  })
  .post(async (req, res) => {
    const noteUpdate = req.body
    let note = req.note
    note = extend(note, noteUpdate)
    note = await note.save()
    res.json({ success: true, note })
  })

module.exports = router
