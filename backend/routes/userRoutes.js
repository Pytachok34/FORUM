const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Регистрация пользователя
router.post('/register', async (req, res) => {
    const { username, email, password, is_admin } = req.body;

    try {
        // Проверяем, что пользователя с таким email или username нет
        const userExists = await pool.query(
            'SELECT * FROM users WHERE email = $1 OR username = $2',
            [email, username]
        );
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'Пользователь с таким email или именем уже существует' });
        }

        // Хешируем пароль
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Вставляем нового пользователя
        const newUser = await pool.query(
            `INSERT INTO users (username, email, password_hash, is_admin) 
       VALUES ($1, $2, $3, $4) RETURNING id, username, email, is_admin`,
            [username, email, password_hash, is_admin || false]
        );

        res.json(newUser.rows[0]);
    } catch (error) {
        console.error('Ошибка регистрации:', error);
        res.status(500).json({ error: 'Ошибка сервера при регистрации' });
    }
});

// Вход пользователя
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (userRes.rows.length === 0) {
            return res.status(400).json({ error: 'Неверный email или пароль' });
        }

        const user = userRes.rows[0];
        const validPass = await bcrypt.compare(password, user.password_hash);

        if (!validPass) {
            return res.status(400).json({ error: 'Неверный email или пароль' });
        }

        // Генерация JWT (секрет в .env)
        const token = jwt.sign(
            { userId: user.id, username: user.username, isAdmin: user.is_admin },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, username: user.username, isAdmin: user.is_admin });
    } catch (error) {
        console.error('Ошибка входа:', error);
        res.status(500).json({ error: 'Ошибка сервера при входе' });
    }
});

// Получить данные текущего пользователя (авторизованный роут, потребуется middleware для аутентификации)
router.get('/me', async (req, res) => {
    // предполагается, что в req.user хранится объект пользователя после проверки токена
    try {
        const userId = req.user.userId;
        const userRes = await pool.query('SELECT id, username, email, is_admin FROM users WHERE id = $1', [userId]);
        if (userRes.rows.length === 0) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        res.json(userRes.rows[0]);
    } catch (error) {
        console.error('Ошибка получения данных пользователя:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

module.exports = router;
