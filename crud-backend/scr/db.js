import pg from "pg"
import env from 'dotenv'

env.config();

const db = new pg.Client({
    user: process.env.PG_User,
    host: process.env.PG_Host,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

db.connect();

db.on('error', (err) =>{
    console.error('unexpected error on idle client', err)
    process.exit()
})

export const query = (text, params) => db.query(text, params); 