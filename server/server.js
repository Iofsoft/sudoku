const app = require('./index');
const { sequelize, connectWithRetry } = require('./db');
const PORT = 5000;

async function startServer() {
    console.log(`Starting server on port ${PORT} with host 0.0.0.0`);

    try {
        await connectWithRetry();

        await sequelize.sync({ force: true });

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
