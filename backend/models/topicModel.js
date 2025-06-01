const pool = require('../config/db');

const getAllTopics = async () => {
    const result = await pool.query('SELECT * FROM topics ORDER BY created_at DESC');
    return result.rows;
};

const getTopicById = async (id) => {
    const result = await pool.query('SELECT * FROM topics WHERE id = $1', [id]);
    return result.rows[0];
};

module.exports = {
    getAllTopics,
    getTopicById,
};
