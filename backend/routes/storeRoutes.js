const express = require('express');
const { addStore, getStores } = require('../controllers/storeController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, addStore);
router.get('/', verifyToken, getStores);

module.exports = router;