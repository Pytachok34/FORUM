import React from 'react';
import TopicCard from './TopicCard';

const TopicList = ({ topics }) => {
    return (
        <div className="topic-list">
            {topics.map((topic, idx) => (
                <TopicCard key={idx} title={topic.title} author={topic.author} description={topic.description} />
            ))}
        </div>
    );
};

export default TopicList;
