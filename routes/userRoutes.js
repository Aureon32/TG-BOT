const express = require('express');
const router = express.Router();
const { getUser, updateClicks, get_user_claims } = require('../controllers/userController');

// Маршруты для пользователей
router.get('/:username', getUser);
router.post('/update_clicks', updateClicks);
router.post('/get_user_claims', get_user_claims);

module.exports = router;
