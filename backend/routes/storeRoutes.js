const express = require('express');
const { addStore } = require('../controllers/storeController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, addStore);

module.exports = router;