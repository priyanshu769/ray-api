const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

// DB Connect
const initializeDBConnect = require('./db/db.connect')
initializeDBConnect()

// Routers
const notes = require('./routers/notes.v1.router')

app.use('/notes', notes)

app.get("/", (req, res)=> {
    res.send("Ray, API for notes app.")
})

const port = 8000

app.listen(port, ()=> {
    console.log(`Server running on port ${port}...`)
})