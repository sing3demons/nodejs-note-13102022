const { connect } = require('mongoose')

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI, {
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

module.exports = connectDB
