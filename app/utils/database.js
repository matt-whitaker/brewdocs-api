import knex from 'knex';
import config from 'config';

const connection = {
    ...config.get('database.connection'),
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME
};

export default knex({
    client: config.get('database.client'),
    connection,
    pool: {
        ...config.get('database.pool')
    }
});