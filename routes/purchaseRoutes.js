const express = require('express');
const router = express.Router();
const { 
  purchaseClickPower, 
  purchaseAutoClicks, 
  refreshEnergy, 
  increaseMaxEnergy 
} = require('../controllers/purchaseController');

// Маршрут для покупки кликов
router.post('/click_power', purchaseClickPower);

// Маршрут для покупки автокликов
router.post('/auto_clicks', purchaseAutoClicks);

// Маршрут для обновления энергии
router.post('/refresh_energy', refreshEnergy);

// Маршрут для увеличения максимальной энергии
router.post('/increase_max_energy', increaseMaxEnergy);

module.exports = router;
