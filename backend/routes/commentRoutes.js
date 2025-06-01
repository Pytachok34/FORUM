// backend/routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// POST /api/comments - добавить новый комментарий
router.post('/', async (req, res) => {
    const { topic_id, content } = req.body;
    // Тут для примера возьмём фиксированный user_id (например, 1)
    // В реальном приложении нужно брать из авторизации
    const author_id = 1;

    if (!topic_id || !content) {
        return res.status(400).json({ error: 'Отсутствуют необходимые данные' });
    }

    try {
        const result = await pool.query(
            `INSERT INTO comments (topic_id, author_id, content) 
             VALUES ($1, $2, $3) 
             RETURNING id, topic_id, content, created_at`,
            [topic_id, author_id, content]
        );

        const newComment = result.rows[0];

        // Получим имя автора
        const userRes = await pool.query('SELECT username FROM users WHERE id = $1', [author_id]);
        newComment.author = userRes.rows[0].username || 'Неизвестный';

        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

module.exports = router;
