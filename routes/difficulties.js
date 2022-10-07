const express = require('express');
const { createDifficulty } = require('../controllers/difficultyController');

const router = express.Router();

router.post('/', createDifficulty);

module.exports = router;
