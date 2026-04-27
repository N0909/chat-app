import mysql from 'mysql2/promise';
import 'dotenv/config';

const db = await mysql.createConnection({
    host:process.env.HOST,
    user:process.env.user,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
});

export default db;
