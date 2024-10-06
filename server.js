const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const referralRoutes = require('./routes/referralRoutes');
const rewardRoutes = require('./routes/rewardRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const questsRoutes = require('./routes/questsRoutes');
const achievementsRoutes = require('./routes/achievementsRoutes');
const cardsRoutes = require('./routes/cardsRoutes'); // Добавляем маршруты для карточек

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Подключение маршрутов
app.use('/api/users', userRoutes);
app.use('/api/purchases', purchaseRoutes);;
app.use('/api/referrals', referralRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/quests', questsRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/cards', cardsRoutes); // Используем новые маршруты для карточек

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
