const express = require('express');
const router = express.Router();
const { generateReferralCode, useReferralCode } = require('../controllers/referralController');

router.post('/generate', generateReferralCode);
router.post('/use', useReferralCode);

module.exports = router;
