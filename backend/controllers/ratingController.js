const dbPromise = require('../config/db');

exports.submitRating = async (req, res) => {
    try {
        const { user_id, store_id, rating } = req.body;
        const db = await dbPromise;

        const getQuery = `SELECT * FROM users WHERE id = ?`
        const dbUser = await db.get(getQuery, [user_id]) 

        const getStoreQuery = `SELECT * FROM stores WHERE id = ?`
        const dbStores = await db.get(getStoreQuery, [store_id]) 

        if (dbUser === undefined && dbStores === undefined){
            return res.status(400).json({ message: 'Invalid user and store' });
        }

        if (dbUser === undefined){
            return res.status(400).json({ message: 'Invalid user' });
        }

        if (dbStores === undefined){
            return res.status(400).json({ message: 'Invalid store' });
        }
        
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }



        const ratings = await db.run(
            'INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)',
            [user_id, store_id, rating]
        );
        const ratingId =  ratings.lastID;
        
        res.status(201).json({ message: 'Rating submitted', ratingId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};