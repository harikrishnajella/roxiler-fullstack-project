const dbPromise = require('../config/db');

exports.addStore = async (req, res) => {
    try {
        const { name, email, address } = req.body;
        const db = await dbPromise;
        const store = await db.run(
            'INSERT INTO stores (name, email, address) VALUES (?, ?, ?)',
            [name, email, address]
        );
        const storeId = store.lastID
        
        res.status(201).json({ message: 'Store added', storeId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStores = async (req, res) => {
    try {
        const db = await dbPromise;
        const stores = await db.all('SELECT * FROM stores');
        
        res.status(200).json({stores: stores,  message: 'Fetching Stores'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


