const express = require('express');
const router = express.Router();
const { purchaseClickPower, purchaseAutoClicks } = require('../controllers/purchaseController');

router.post('/', purchaseClickPower);

module.exports = router;
