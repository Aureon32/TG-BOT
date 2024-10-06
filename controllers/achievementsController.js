const pool = require('../db/pool');

// Получение ачивок пользователя
const getUserAchievements = async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM user_achievements WHERE user_id = $1', [user_id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Получение всех ачивок
const getAllAchievements = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM achievements');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Разблокировка ачивки
const unlockAchievement = async (req, res) => {
  const { user_id, achievement_id } = req.body;
  try {
    // Проверяем, разблокирована ли ачивка
    const result = await pool.query(
      'SELECT * FROM user_achievements WHERE user_id = $1 AND achievement_id = $2',
      [user_id, achievement_id]
    );

    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'Achievement already unlocked' });
    }

    // Разблокировка ачивки
    await pool.query(
      'INSERT INTO user_achievements (user_id, achievement_id) VALUES ($1, $2)',
      [user_id, achievement_id]
    );

    res.json({ message: 'Achievement unlocked!' });
  } catch (error) {
    console.error('Error unlocking achievement:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  getUserAchievements,
  getAllAchievements,
  unlockAchievement,
};
