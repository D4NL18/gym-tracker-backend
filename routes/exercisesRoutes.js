const express = require('express')
const router = express.Router()
const ExerciseController = require('../controller/ExerciseController')

const checkAuth = require('../helpers/auth').checkAuth

router.post('/add', checkAuth, ExerciseController.createExercisePost)
router.get('/edit/:id', checkAuth, ExerciseController.updateExerciseGet)
router.post('/edit/:id', checkAuth, ExerciseController.updateExercisePost)
router.post('/remove', checkAuth, ExerciseController.deleteExercisePost)

module.exports = router