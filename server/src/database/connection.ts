import knex from 'knex';
import path from 'path';

// migrations: controlam versões do banco de dados

const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'youshallnotpass',
        database: 'proffy_db',
    },
    useNullAsDefault: true,
})

export default db;