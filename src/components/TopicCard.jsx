import React from 'react';
import { Link } from 'react-router-dom';

const TopicCard = ({ topic }) => (
    <Link to={`/topic/${topic.id}`} className="topic-card">
        <h3>{topic.title}</h3>
        <p>{topic.preview}</p>
    </Link>
);

export default TopicCard;
