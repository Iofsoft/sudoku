const Sequelize = require('sequelize');
const { sequelize } = require('../db');
const User = require('./user');

const Record = sequelize.define('record', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  numbersLeft: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey:true
  },
  rightNumbers: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey:true
  },
  wrongNumbers: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey:true
  },
  score:{
    type: Sequelize.INTEGER,
  },
  idUser: { 
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    primaryKey: true
  }
});

Record.belongsTo(User, {
  foreignKey: 'idUser'
});

module.exports = Record;
