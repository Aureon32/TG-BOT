const pool = require('../db/pool');

// Получение карт пользователя
const getUserCards = async (req, res) => {
  const { username } = req.params;
  
  try {
    const userResult = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
    const userId = userResult.rows[0].id;

    const userCards = await pool.query(
      `SELECT uc.card_id, c.name, c.description, uc.level, c.base_clicks_per_hour
       FROM user_cards uc
       JOIN cards c ON uc.card_id = c.id
       WHERE uc.user_id = $1`,
      [userId]
    );

    res.json({ cards: userCards.rows });
  } catch (error) {
    console.error('Ошибка при загрузке карточек:', error);
    res.status(500).json({ error: 'Ошибка при загрузке карточек' });
  }
};

// Прокачка карты
const upgradeCard = async (req, res) => {
  const { username, cardId } = req.body;

  try {
    const userResult = await pool.query('SELECT id, clicks_per_hour FROM users WHERE username = $1', [username]);
    const userId = userResult.rows[0].id;
    const currentClicksPerHour = userResult.rows[0].clicks_per_hour;

    const userCardResult = await pool.query(
      'SELECT level FROM user_cards WHERE user_id = $1 AND card_id = $2',
      [userId, cardId]
    );
    const currentLevel = userCardResult.rows[0].level;

    const newLevel = currentLevel + 1;
    await pool.query(
      'UPDATE user_cards SET level = $1 WHERE user_id = $2 AND card_id = $3',
      [newLevel, userId, cardId]
    );

    const cardResult = await pool.query('SELECT base_clicks_per_hour FROM cards WHERE id = $1', [cardId]);
    const baseClicksPerHour = cardResult.rows[0].base_clicks_per_hour;

    const newClicksPerHour = currentClicksPerHour + baseClicksPerHour + newLevel * 10;
    await pool.query('UPDATE users SET clicks_per_hour = $1 WHERE id = $2', [newClicksPerHour, userId]);

    res.json({ message: 'Карта успешно прокачана' });
  } catch (error) {
    console.error('Ошибка при прокачке карты:', error);
    res.status(500).json({ error: 'Ошибка при прокачке карты' });
  }
};

module.exports = {
  getUserCards,
  upgradeCard,
};
