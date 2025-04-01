const dbPromise = require('../config/db');

exports.getUsers = async (req, res) => {
    try {
        const db = await dbPromise;
        const users = await db.all('SELECT * FROM users');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};