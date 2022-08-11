require("dotenv").config();
const Pool = require('pg').Pool

const pool = new Pool ({
    user: process.env.PG_USER,
    host: process.env.HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASS,
    port: process.env.PG_PORT,
});

pool.connect()
    .then(() => {
        console.log('\x1b[33m%s\x1b[0m', 'CONNECTED TO DB');
    })
    .catch(err => console.error(err.message));

    module.exports = pool;