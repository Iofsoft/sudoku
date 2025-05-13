const { Sequelize } = require('sequelize');

let sequelize; // define fora para poder exportar depois

// Configuration
const dbConfig = {
    database: 'sudoku',
    username: 'postgres',
    password: 'postgres',
    host: 'db',
    port: 5432,
    dialect: 'postgres',
    logging: console.log,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    retry: {
        max: 10,
        timeout: 3000
    }
};

// Função de conexão com retry
const connectWithRetry = async (retries = dbConfig.retry.max, timeout = dbConfig.retry.timeout) => {
    let currentAttempt = 1;

    while (currentAttempt <= retries) {
        try {
            console.log(`Connection attempt ${currentAttempt}/${retries}...`);
            
            // cria o sequelize apenas quando for tentar a conexão
            sequelize = new Sequelize(
                dbConfig.database,
                dbConfig.username,
                dbConfig.password,
                {
                    host: dbConfig.host,
                    port: dbConfig.port,
                    dialect: dbConfig.dialect,
                    logging: dbConfig.logging,
                    pool: dbConfig.pool,
                }
            );

            await sequelize.authenticate();
            console.log('Conexão com o banco estabelecida com sucesso!');
            return;
        } catch (err) {
            console.error(`Conexão falhou: ${err.message}`);
            if (currentAttempt === retries) throw err;
            currentAttempt++;
            console.log(`Tentando novamente em ${timeout / 1000} segundos...`);
            await new Promise(res => setTimeout(res, timeout));
        }
    }
};

// exporta depois da conexão
module.exports = {
    connectWithRetry,
    getSequelize: () => sequelize
};
