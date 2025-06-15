require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Подключаем маршруты
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const settingsRoutes = require('./routes/settings.routes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Простой маршрут для проверки
app.get('/', (req, res) => {
    res.json({ message: 'Сервер запущен!' });
});

// Маршруты
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/settings', settingsRoutes);

// Запуск сервера
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
});