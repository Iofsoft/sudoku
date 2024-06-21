
const {Client} = require('pg')

async function createDatabase(){
    const client = new Client({
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
        user: 'postgres',
        password: '1337'
    })

    try{
        await client.connect()
        const res = await client.query("select * from pg_database where datname='player'");
    
        if (res.rowCount === 0) {
            await client.query('create database player');
            console.log("Database 'player' created");
        } else {
            console.log("Database player already exists");
        }
    } 
    catch (error){
        console.error(error);
    } 
    finally{
        await client.end();
    }
}

module.exports = createDatabase
