const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const Training = db.define('Training', {
    name: {
        type: DataTypes.STRING,
        require: true,
    },
    letter: {
        type: DataTypes.CHAR,
        require: false
    }
})

Training.belongsTo(User)
User.hasMany(Training)

module.exports = Training