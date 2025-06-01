// server/routes/topics.js
const express = require('express');
const router = express.Router();
const db = require('./db');

// Получить все темы
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM topics');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при получении тем' });
    }
});

// Получить тему по id
router.get('/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM topics WHERE id = $1', [req.params.id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при получении темы' });
    }
});

module.exports = router;
