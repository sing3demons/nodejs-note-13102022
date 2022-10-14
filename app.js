const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3000
const noteRoute = require('./routes/note.js')
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/', {
      useNewUrlParser: true,
      user: 'kpsing',
      pass: 'passw0rd',
      dbName: 'node-ts',
    })

    console.log('MongoDB connection is successful')
  } catch (error) {
    console.log(`error connecting to the database: ${error}`)
  }
}

connectDB()

app.use(express.json({}))
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.get('/', (req, res) => res.status(200).send('Hello World!'))

app.use('/api/note', noteRoute)

// localhost:3000/api/users
app.use('/api/users', require('./routes/users.js'))

app.listen(port, () => console.log(`listening on port ${port}!`))
