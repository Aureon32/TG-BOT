const pool = require('../db/pool');

// Получение ежедневной награды
const claimDailyReward = async (req, res) => {
  const { username } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const lastClaimed = new Date(user.last_daily_claim);
      const now = new Date();

      const timeDiff = now - lastClaimed;
      const hoursDiff = timeDiff / (1000 * 60 * 60); // Разница в часах

      if (hoursDiff >= 24) {
        await pool.query(
          'UPDATE users SET click_count = click_count + 100, last_daily_claim = NOW() WHERE username = $1',
          [username]
        );
        res.json({ message: 'Daily reward claimed: +100 clicks' });
      } else {
        res.status(400).json({ message: 'Daily reward not available yet' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error claiming daily reward:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Получение часовой награды
const claimHourlyReward = async (req, res) => {
  const { username } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const lastClaimed = new Date(user.last_hourly_claim);
      const now = new Date();

      const timeDiff = now - lastClaimed;
      const minutesDiff = timeDiff / (1000 * 60); // Разница в минутах

      if (minutesDiff >= 60) {
        await pool.query(
          'UPDATE users SET click_count = click_count + 50, last_hourly_claim = NOW() WHERE username = $1',
          [username]
        );
        res.json({ message: 'Hourly reward claimed: +50 clicks' });
      } else {
        res.status(400).json({ message: 'Hourly reward not available yet' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error claiming hourly reward:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Получение награды каждые 4 часа
const claimFourHourReward = async (req, res) => {
  const { username } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const lastClaimed = new Date(user.last_four_hour_claim);
      const now = new Date();

      const timeDiff = now - lastClaimed;
      const hoursDiff = timeDiff / (1000 * 60 * 60); // Разница в часах

      if (hoursDiff >= 4) {
        await pool.query(
          'UPDATE users SET click_count = click_count + 200, last_four_hour_claim = NOW() WHERE username = $1',
          [username]
        );
        res.json({ message: '4-hour reward claimed: +200 clicks' });
      } else {
        res.status(400).json({ message: '4-hour reward not available yet' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error claiming 4-hour reward:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  claimDailyReward,
  claimHourlyReward,
  claimFourHourReward,
};
