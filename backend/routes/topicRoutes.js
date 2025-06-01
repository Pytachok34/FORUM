// backend/routes/topicRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT topics.id, topics.title, topics.content, users.username AS author, topics.created_at
      FROM topics
      LEFT JOIN users ON topics.author_id = users.id
      ORDER BY topics.created_at DESC
    `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});
router.get('/:id', async (req, res) => {
    const topicId = req.params.id;
    const topic = await pool.query(`
    SELECT t.id, t.title, t.content, t.created_at, u.username AS author
    FROM topics t
    LEFT JOIN users u ON t.author_id = u.id
    WHERE t.id = $1
  `, [topicId]);

    const comments = await pool.query(`
    SELECT c.id, c.content, c.created_at, u.username AS author
    FROM comments c
    LEFT JOIN users u ON c.author_id = u.id
    WHERE c.topic_id = $1
    ORDER BY c.created_at ASC
  `, [topicId]);

    if (topic.rows.length === 0) {
        return res.status(404).json({ error: 'Тема не найдена' });
    }

    res.json({
        topic: topic.rows[0],
        comments: comments.rows,
    });
});


module.exports = router;
