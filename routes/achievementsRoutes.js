const express = require('express');
const router = express.Router();
const { getUserAchievements, getAllAchievements, unlockAchievement } = require('../controllers/achievementsController');

// Маршруты для ачивок
router.get('/user/:user_id', getUserAchievements); // Получение ачивок пользователя
router.get('/', getAllAchievements); // Получение всех ачивок
router.post('/unlock', unlockAchievement); // Разблокировка ачивки

module.exports = router;
