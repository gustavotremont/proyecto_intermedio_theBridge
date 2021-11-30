const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    max: 20
});

module.exports = pool;