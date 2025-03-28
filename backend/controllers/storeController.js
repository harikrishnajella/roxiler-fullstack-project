const db = require('../config/db');

exports.addStore = async (req, res) => {
    try {
        const { name, email, address } = req.body;
        const [store] = await db.query(
            'INSERT INTO stores (name, email, address) VALUES (?, ?, ?)',
            [name, email, address]
        );
        const storeId = store.insertId
        
        res.status(201).json({ message: 'Store added', storeId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};