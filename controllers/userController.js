const pool = require('../db/pool');

// Получение данных пользователя
const getUser = async (req, res) => {
  const { username } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Обновление кликов пользователя
const updateClicks = async (req, res) => {
  const { username, click_count, rank, level, last_active, energy } = req.body;
  try {
    await pool.query(
      'UPDATE users SET click_count = $1, rank = $2, level = $3, last_active = NOW(), energy = $4 WHERE username = $5',
      [click_count, rank, level, energy, username]
    );
    res.json({ message: 'User clicks updated' });
  } catch (error) {
    console.error('Error updating user clicks:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Получение информации о наградах пользователя
const get_user_claims = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await pool.query(
      'SELECT last_daily_claim, last_four_hour_claim, last_hour_claim FROM users WHERE username = $1',
      [username]
    );
    if (user.rows.length > 0) {
      res.json(user.rows[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user claims:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getUser, updateClicks, get_user_claims };
