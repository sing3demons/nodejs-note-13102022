const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')

const app = express()
const port = 3000

mongoose
  .connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    user: 'kpsing',
    pass: 'passw0rd',
    dbName: 'node-ts',
  })
  .then(() => console.log('MongoDB connection is successful'))
  .catch((err) => {
    console.log(`error connecting to the database: ${err}`)
  })

app.use(passport.initialize())
app.use(express.json({}))
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.get('/', (req, res) => res.status(200).send('Hello World!'))

app.use('/api/note', require('./routes/note.js'))
app.use('/api/users', require('./routes/user.js'))

app.listen(port, () => console.log(`listening on port ${port}!`))
