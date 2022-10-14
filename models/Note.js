const { model, Schema } = require('mongoose')
const noteSchema = new Schema(
  {
    title: String,
    text: String,
    date: Date,
  },
  {
    collection: 'note',
    versionKey: false,
  }
)
const Note = model('note', noteSchema)
module.exports = Note
