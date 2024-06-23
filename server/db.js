const Sequelize = require('sequelize')

const sequelize = new Sequelize('sudoku', 'postgres', '1337',{
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    // logging:false
})

module.exports = sequelize;
