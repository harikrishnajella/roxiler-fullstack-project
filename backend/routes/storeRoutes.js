const express = require('express');
const { addStore, getStores } = require('../controllers/storeController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', addStore);
router.get('/', getStores);

module.exports = router;