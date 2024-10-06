const mongoose = require('mongoose');

// Определяем схему для хранения ресурсов
const resourceSchema = new mongoose.Schema({
  userId: { type: String, required: true },  // ID пользователя, который кликает
  clicks: { type: Number, default: 0 }       // Количество кликов (ресурсов)
});

// Создаем и экспортируем модель
module.exports = mongoose.model('Resource', resourceSchema);
