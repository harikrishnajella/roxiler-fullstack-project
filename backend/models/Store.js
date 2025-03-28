const db = require('../config/db');

const createStoreTable = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS stores (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                address VARCHAR(400) NOT NULL,
                owner_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        console.log('Stores table created or already exists');
    } catch (error) {
        console.error('Error creating Stores table:', error);
    }
};

// Run table creation
createStoreTable();

module.exports = db;
