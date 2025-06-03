// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const topicRoutes = require('./routes/topicRoutes');
const commentRoutes = require('./routes/commentRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/topics', topicRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
