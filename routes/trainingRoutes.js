const express = require('express')
const router = express.Router()
const TrainingController = require('../controller/TrainingController')

const checkAuth = require('../helpers/auth').checkAuth

router.post('/add', checkAuth, TrainingController.createTrainingPost)
router.get('/edit/:id', checkAuth, TrainingController.updateTrainingGet)
router.post('/edit/:id', checkAuth, TrainingController.updateTrainingPost)
router.post('/remove', checkAuth, TrainingController.deleteTrainingPost)

module.exports = router