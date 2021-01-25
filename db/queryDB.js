const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'password',
    database: 'gifttree',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

let queryDB = {};

queryDB.queryData = async (myQuery) => {
    const result = await pool.query(myQuery);
    return result[0];
}

module.exports = queryDB;