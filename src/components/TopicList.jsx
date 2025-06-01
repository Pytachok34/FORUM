import React from 'react';
import TopicCard from './TopicCard';

const TopicList = ({ topics, onTopicClick }) => (
    <div className="topic-list">
        {topics.map((topic) => (
            <TopicCard
                key={topic.id}
                title={topic.title}
                author={topic.author}
                description={topic.description}
                onClick={() => onTopicClick(topic.id)}
            />
        ))}
    </div>
);

export default TopicList;

