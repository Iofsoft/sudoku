const database = require('./db')

async function databaseConnect(){
    try{
        await database.sync({force: false})
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = databaseConnect
