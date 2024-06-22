const Sequelize = require('sequelize')

const sequelize = new Sequelize('player', 'postgres', '1337',{
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    // logging:false
})

module.exports = sequelize;
