const express = require('express');
const { submitRating } = require('../controllers/ratingController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, submitRating);

module.exports = router;