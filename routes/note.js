const { Router } = require('express')
const { model, Schema } = require('mongoose')
const router = Router()

const noteSchema = Schema(
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
const Note = new model('note', noteSchema)

router.get('/', async (req, res) => {
  const result = await Note.find({})
  res.status(200).json({
    resultCode: 20000,
    resultData: result,
  })
})

router.post('/', async (req, res) => {
  const { title, text } = req.body
  const result = await Note.create({
    title,
    text,
    date: Date.now(),
  })

  res.status(201).json({
    resultCode: 20100,
    resultData: result,
  })
})

module.exports = router
