const db = require('../config/db');

const createUserTable = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(60) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                address VARCHAR(400),
                password VARCHAR(255) NOT NULL,
                role ENUM('admin', 'user', 'store_owner') NOT NULL DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Users table created or already exists');
    } catch (error) {
        console.error('Error creating Users table:', error);
    }
};

// Run table creation
createUserTable();

module.exports = db;
