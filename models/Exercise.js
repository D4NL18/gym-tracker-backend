const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Training = require('./Training')

const Exercise = db.define('Exercise', {
    name: {
        type: DataTypes.STRING,
        require: true,
    },
    charge: {
        type: DataTypes.INTEGER,
        require: false
    }
})

Exercise.belongsTo(Training)
Training.hasMany(Exercise)

module.exports = Exercise