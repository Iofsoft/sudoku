const Sequelize = require('sequelize');

// Configuration for database connection
const dbConfig = {
    database: 'sudoku',
    username: 'postgres',
    password: 'postgres',
    host: 'db', // Docker service name
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
        max: 10,           // Maximum retry attempts
        timeout: 3000      // Delay between retries in ms
    }
};

console.log(`Attempting to connect to PostgreSQL at ${dbConfig.host}:${dbConfig.port}`);

const sequelize = new Sequelize(
    dbConfig.database, 
    dbConfig.username, 
    dbConfig.password, 
    {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        logging: dbConfig.logging,
        pool: dbConfig.pool,
        dialectOptions: {
            host: dbConfig.host
        }
    }
);

const connectWithRetry = async (retries = dbConfig.retry.max, timeout = dbConfig.retry.timeout) => {
    let currentAttempt = 1;
    
    const tryConnect = async () => {
        try {
            console.log(`Connection attempt ${currentAttempt}/${retries}...`);
            await sequelize.authenticate();
            console.log('Database connection has been established successfully!');
            return true;
        } catch (err) {
            console.error(`Connection attempt ${currentAttempt} failed:`, err.message);
            
            if (currentAttempt < retries) {
                currentAttempt++;
                console.log(`Retrying in ${timeout/1000} seconds...`);
                return new Promise(resolve => {
                    setTimeout(() => resolve(tryConnect()), timeout);
                });
            } else {
                console.error('Max retries reached. Could not connect to the database.');
                throw err;
            }
        }
    };
    
    return tryConnect();
};

connectWithRetry()
    .catch(err => {
        console.error('All connection attempts failed:', err);

    });

module.exports = sequelize;
