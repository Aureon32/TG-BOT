const express = require('express');
const router = express.Router();
const { getUserCards, upgradeCard } = require('../controllers/cardsController');

// Маршруты для работы с карточками
router.get('/:username', getUserCards); // Получение карточек пользователя
router.post('/upgrade', upgradeCard); // Прокачка карты

module.exports = router;
