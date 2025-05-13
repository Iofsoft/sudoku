const app = require('./index');
const { connectWithRetry, getSequelize } = require('./db');
const PORT = 5000;

const ENV = process.env.NODE_ENV || 'development';

async function startServer() {
    console.log(`Starting server on port ${PORT} with host 0.0.0.0`);

    try {
        await connectWithRetry(); // conecta primeiro
        const sequelize = getSequelize(); // só pega depois de conectar

        if (ENV === 'development') {
            console.log('Ambiente de desenvolvimento. Rodando sync({ force: true })');
            await sequelize.sync({ force: true });
        } else {
            console.log(`Ambiente ${ENV}. Rodando sync() sem force`);
            await sequelize.sync();
        }

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`==== Servidor rodando na porta ${PORT} ====`);
            console.log(`==== Acessível via http://0.0.0.0:${PORT} (dentro do container) ====`);
            console.log(`==== Acessível via http://localhost:${PORT} (do seu computador) ====`);
        });
    } catch (err) {
        console.error('Erro ao iniciar o servidor:', err);
        process.exit(1);
    }
}

startServer();
