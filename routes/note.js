const { Router } = require('express')
const router = Router()
const noteController = require('../controllers/noteController.js')

// http://localhost:3000/api/note
router.get('/', noteController.findAll)

router.get('/:id', noteController.findOne)

router.post('/', noteController.create)

router.put('/:id', noteController.update)

router.delete('/:id', noteController.delete)

module.exports = router
