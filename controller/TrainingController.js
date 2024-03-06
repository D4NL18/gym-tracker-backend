const Training = require('../models/Training')
const User = require('../models/User')

module.exports = class TrainingController {

    static async createTrainingPost(req, res) {

        const training = {
            name: req.body.name,
            letter: req.body.letter,
            UserId: req.session.userid
        }

        try {
            await Training.create(training)
            console.log("Training criado com sucesso!")
        } catch (error) {
            console.log(`Erro ao criar Training: ${error}`)
        }
    }

    static async updateTrainingGet(req, res) {
        try {
            const training = await Training.findOne({
                where: {
                    id: req.params.id
                }
            });

            if (!training) {
                console.log("Training not found")
            }

            res.json(training);
        } catch (error) {
            console.log(`Erro no Get de criar training: ${error}`);
        }
    }
    static async updateTrainingPost(req, res) {
        const training = {
            name: req.body.name,
            letter: req.body.letter,
        }
        try {
            await Training.update(
                training,
                {
                    where: 
                    {
                        id: req.params.id
                    }
                }
            )
            console.log("Training editado com sucesso")
        } catch (error) {
            console.log(`Erro ao editar training: ${error}`)
        }
    }

    static async deleteTrainingPost(req, res) {
        try {
            await Training.destroy({
                where: {
                    id: req.body.id
                }
            })
            console.log("Training Removido com sucesso")
        } catch (error) {
            console.log(`Erro ao remover training: ${error}`)
        }
    }



}