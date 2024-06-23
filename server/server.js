const app = require('./index');
const sequelize = require('./db');
const User = require('./models/user');
const Record = require('./models/record');
const PORT = 3000;

(async () =>{
    await sequelize.sync({force:true})
})();

app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});