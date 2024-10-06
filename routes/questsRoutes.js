const express = require('express');
const router = express.Router();
const { getQuests, completeQuest } = require('../controllers/questsController');

// Маршруты для квестов
router.get('/', getQuests); // Получение всех квестов
router.post('/complete', completeQuest); // Завершение квеста

module.exports = router;
