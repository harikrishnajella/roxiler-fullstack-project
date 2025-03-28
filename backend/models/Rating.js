const db = require('../config/db');

const createRatingTable = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS ratings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                store_id INT NOT NULL,
                rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
            )
        `);
        console.log('Ratings table created or already exists');
    } catch (error) {
        console.error('Error creating Ratings table:', error);
    }
};

// Run table creation
createRatingTable();

module.exports = db;
