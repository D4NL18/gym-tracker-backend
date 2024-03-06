const Exercise = require('../models/Exercise')
const User = require('../models/User')

module.exports = class TrainingController {

    static async createExercisePost(req, res) {
        const exercise = {
            name: req.body.name,
            charge: req.body.charge,
            TrainingId: req.body.trainingId
        }

        try {
            await Exercise.create(exercise)
            console.log("Exercise criado com sucesso!")
        } catch (error) {
            console.log(`Erro ao criar exercise: ${error}`)
        }

    }

    static async deleteExercisePost(req, res) {
        try {
            await Exercise.destroy({
                where: {
                    id: req.body.id
                }
            })
        } catch (error) {
            console.log(`Erro ao deletar Exercise: ${error}`)
        }
    }

    static async updateExerciseGet(req, res) {
        try {
            const exercise = await Exercise.findOne({
                where: {
                    id: req.params.id
                }
            });

            if (!exercise) {
                console.log("Training not found")
            }

            res.json(exercise);
        } catch (error) {
            console.log(`Erro no Get de criar exercise: ${error}`);
        }
    }
    static async updateExercisePost(req, res) {
        const exercise = {
            name: req.body.name,
            charge: req.body.charge
        }
        try {
            await Exercise.update(
                exercise,
                {
                    where:
                    {
                        id: req.params.id
                    }
                }
            )
            console.log("Exercise editado com sucesso!")
        } catch (error) {
            console.log(`Erro ao editar Exercise: ${error}`)
        }

    }

}