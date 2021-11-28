const { Pool } = require("pg");

// const pool = new Pool({
//     user: process.env.USER,
//     host: process.env.HOST,
//     database: process.env.DATABASE,
//     password: process.env.PASSWORD,
// });

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "intermedio_users",
    password: "0000",
});

module.exports = pool;