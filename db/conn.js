const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('GymTracker', 'root', 'Dm120394', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectado ao Banco de Dados')
} catch (error) {
    console.log(`Não foi possível conectar ao banco de dados: ${error}`)
}

module.exports = sequelize