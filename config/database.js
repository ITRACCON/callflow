const mysql = require('mysql2/promise');

// Подключение к базе данных
const pool = mysql.createPool({
    host: 'localhost',
    user: 'region_admin',
    password: 'region_qSyTi0780', // замени на свой пароль от MySQL
    database: 'region',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;