const db = require('../config/db');

exports.submitRating = async (req, res) => {
    try {
        const { user_id, store_id, rating } = req.body;
        
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        const [ratings] = await db.query(
            'INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)',
            [user_id, store_id, rating]
        );
        const ratingId =  ratings.insertId;
        
        res.status(201).json({ message: 'Rating submitted', ratingId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};