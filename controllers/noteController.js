const Note = require('../models/Note.js')

exports.findAll = async (req, res) => {
  const result = await Note.find({})
  res.status(200).json({
    resultCode: 20000,
    resultDescription: 'find all note',
    resultData: result,
  })
}

exports.findOne = async (req, res) => {
  const { id } = req.params
  const result = await Note.findById(id)
  if (!result) {
    return res.status(404).json({
      resultCode: 40400,
      resultDescription: 'not found',
    })
  }
  res.status(200).json({
    resultCode: 20000,
    resultData: result,
  })
}

exports.create = async (req, res) => {
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
}

exports.update = async (req, res) => {
  const { id } = req.params
  const { title, text } = req.body
  await Note.findByIdAndUpdate(id, {
    title,
    text,
    date: Date.now(),
  })

  res.status(200).json({
    resultCode: 20000,
    resultDescription: 'update success',
  })
}

exports.delete = async (req, res) => {
  const { id } = req.params
  await Note.findByIdAndDelete(id)
  res.status(200).json({
    resultCode: 20000,
    resultDescription: 'delete success',
  })
}
