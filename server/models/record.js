const Sequelize = require('sequelize');
const sequelize = require('../db')
const User = require('./user')

const Record = sequelize.define('record', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  remainingNumbers: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
})

Record.belongsTo(User,{
    constraint: true,
    foreignKey: 'idUser'
} )

module.exports = Record;
