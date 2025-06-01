const Topic = require('../models/topicModel');

const getTopics = async (req, res) => {
    try {
        const topics = await Topic.getAllTopics();
        res.json(topics);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch topics' });
    }
};

const getTopic = async (req, res) => {
    try {
        const topic = await Topic.getTopicById(req.params.id);
        if (!topic) return res.status(404).json({ error: 'Topic not found' });
        res.json(topic);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch topic' });
    }
};

module.exports = {
    getTopics,
    getTopic,
};
