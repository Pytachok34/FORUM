// src/components/TopicCard.jsx
import React from 'react';

const TopicCard = ({ title, author, description, onClick }) => (
    <div className="topic-card" onClick={onClick} style={{ cursor: 'pointer' }}>
        <h3>{title}</h3>
        <p>{description}</p>
        <small>Автор: {author || 'Неизвестно'}</small>
    </div>
);

export default TopicCard;

