const pool = require('../db/pool');

const purchaseClickPower = async (req, res) => {
  const { username } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      if (user.click_count >= 100) {
        await pool.query('UPDATE users SET click_count = click_count - 100, click_power = click_power + 1 WHERE username = $1', [username]);
        res.json({ message: 'Click power increased!' });
      } else {
        res.status(400).json({ message: 'Not enough clicks' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error during purchase:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = { purchaseClickPower };
