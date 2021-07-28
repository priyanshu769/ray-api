const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

// DB Connect
const initializeDBConnect = require('./db/db.connect')
initializeDBConnect()

// Routers
const notes = require('./routers/notes.v1.router')
const user = require('./routers/user.v1.router')
const login = require('./routers/login.v1.router')
const signup = require('./routers/signup.v1.router')

app.use('/notes', notes)
app.use('/user', user)
app.use('/login', login)
app.use('/signup', signup)

app.get("/", (req, res)=> {
    res.send("Ray, API for notes app.")
})

const port = 8000

app.listen(process.env.PORT || port, ()=> {
    console.log(`Server running on port ${port}...`)
})