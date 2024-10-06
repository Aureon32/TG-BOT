const express = require('express');
const router = express.Router();
const { claimDailyReward, claimHourlyReward, claimFourHourReward } = require('../controllers/rewardController');

router.post('/daily', claimDailyReward);
router.post('/hourly', claimHourlyReward);
router.post('/four_hour', claimFourHourReward);

module.exports = router;
