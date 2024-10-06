const pool = require('../db/pool');

// Получение данных лидерборда
const getLeaderboard = async (req, res) => {
  try {
    const result = await pool.query('SELECT username, click_count, rank FROM users ORDER BY click_count DESC LIMIT 10');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  getLeaderboard,
};
