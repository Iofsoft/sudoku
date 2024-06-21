const databaseConnect = require('./dbConnect')
const createDatabase = require('./dbCreate')
const app = require('./index');
const PORT = 3000;

async function initDatabase(){
    await createDatabase()
    await databaseConnect()
}

initDatabase()

app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});