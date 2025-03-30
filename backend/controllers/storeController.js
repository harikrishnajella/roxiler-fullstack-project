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

exports.getStores = async (req, res) => {
    try {
        const [stores] = await db.query('SELECT * FROM stores');
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
