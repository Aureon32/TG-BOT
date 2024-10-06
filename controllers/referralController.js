const pool = require('../db/pool');

// Генерация реферального кода
const generateReferralCode = async (req, res) => {
  const { username } = req.body;
  const referralCode = Math.random().toString(36).substring(2, 10);
  try {
    await pool.query('UPDATE users SET referral_code = $1 WHERE username = $2', [referralCode, username]);
    res.json({ referral_code: referralCode });
  } catch (error) {
    console.error('Error generating referral code:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Использование реферального кода
const useReferralCode = async (req, res) => {
  const { username, referralCode } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE referral_code = $1', [referralCode]);
    if (result.rows.length > 0) {
      const referredUser = result.rows[0];
      await pool.query('UPDATE users SET click_count = click_count + 100 WHERE username = $1', [username]);
      await pool.query('UPDATE users SET click_count = click_count + 100 WHERE username = $1', [referredUser.username]);
      res.json({ message: 'Referral bonus applied: +100 clicks for both users' });
    } else {
      res.status(404).json({ message: 'Referral code not found' });
    }
  } catch (error) {
    console.error('Error applying referral code:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  generateReferralCode,
  useReferralCode,
};
