const pool = require('../config/db');

const getAllUsers = async () => {
    const result = await pool.query('SELECT id, username, email, role, is_admin FROM users');
    return result.rows;
};

const getUserById = async (id) => {
    const result = await pool.query('SELECT id, username, email, role, is_admin FROM users WHERE id = $1', [id]);
    return result.rows[0];
};

const getUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

const createUser = async (username, email, password_hash) => {
    const result = await pool.query(
        `INSERT INTO users (username, email, password_hash) 
     VALUES ($1, $2, $3) RETURNING id, username, email, role, is_admin`,
        [username, email, password_hash]
    );
    return result.rows[0];
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
};
