
const Sequelize = require('sequelize')

const database = new Sequelize('postgres', 'postgres', '1337',{
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
})

database.authenticate()
 .then(() => {
    console.log('Connected to database!');
  })
 .catch((err) => {
    console.error('Error connecting to database:', err);
  });

module.exports = database;

