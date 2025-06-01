const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const getUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка получения пользователей' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.getUserById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка получения пользователя' });
    }
};

const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.createUser(username, email, hashedPassword);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка регистрации пользователя' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.getUserByEmail(email);
        if (!user) return res.status(401).json({ error: 'Неверные учетные данные' });

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return res.status(401).json({ error: 'Неверные учетные данные' });

        const token = jwt.sign({ id: user.id, is_admin: user.is_admin }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка авторизации' });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    loginUser,
};
