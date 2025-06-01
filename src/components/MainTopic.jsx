import React from 'react';

const MainTopic = ({ title, author, date, content }) => {
    return (
        <div className="main-topic">
            <h1>{title}</h1>
            <div className="topic-meta">
                <span>Автор: {author}</span> | <span>{date}</span>
            </div>
            <p>{content}</p>
        </div>
    );
};

export default MainTopic;
