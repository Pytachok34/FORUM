// backend/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const topicRoutes = require('./routes/topicRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // для парсинга JSON

// Роуты
app.use('/api/topics', topicRoutes);
app.use('/api/users', userRoutes);

// Базовый роут (можно удалить позже)
app.get('/', (req, res) => {
    res.send('Forum API is running...');
});

module.exports = app;
