const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || rating_app,
    waitForConnections: true,
    connectionLimit: 10,  
    queueLimit: 0
}).promise();

db.getConnection()
    .then(conn => {
        console.log("MySql Database connected successfully...");
        conn.release();
    })
    .catch(err => {
        console.error("Database connection failed:", err);
    });

module.exports = db;