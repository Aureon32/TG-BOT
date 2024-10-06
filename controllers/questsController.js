const pool = require('../db/pool');

// Получение списка квестов
const getQuests = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM quests');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching quests:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Завершение квеста
const completeQuest = async (req, res) => {
  const { username, questId } = req.body;
  try {
    // Проверяем наличие квеста
    const questResult = await pool.query('SELECT * FROM quests WHERE id = $1', [questId]);
    if (questResult.rows.length === 0) {
      return res.status(404).json({ message: 'Quest not found' });
    }

    const quest = questResult.rows[0];

    // Обновляем пользователя: добавляем награду за квест
    await pool.query(
      'UPDATE users SET click_count = click_count + $1 WHERE username = $2',
      [quest.reward, username]
    );

    // Отмечаем квест как завершенный
    await pool.query(
      'INSERT INTO user_quests (username, quest_id) VALUES ($1, $2)',
      [username, questId]
    );

    res.json({ message: `Quest completed! Reward: ${quest.reward} clicks` });
  } catch (error) {
    console.error('Error completing quest:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  getQuests,
  completeQuest,
};
