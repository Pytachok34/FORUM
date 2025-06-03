// /backend/routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authenticateToken = require('../middleware/authMiddleware');
router.post('/', authenticateToken, async (req, res) => {
    console.log('Headers:', req.headers); // Логируем заголовки
    console.log('User:', req.user);
    const { topic_id, content } = req.body;

    if (!content || !topic_id) {
        return res.status(400).json({ error: 'Заполните все поля' });
    }

    try {
        const newComment = await pool.query(
            `INSERT INTO comments (topic_id, author_id, content)
             VALUES ($1, $2, $3)
             RETURNING id, content, created_at`,
            [topic_id, req.user.id, content]
        );

        res.status(201).json({
            ...newComment.rows[0],
            author: req.user.username
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при добавлении комментария' });
    }
});

module.exports = router;
