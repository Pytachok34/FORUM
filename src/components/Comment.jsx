import React from 'react';

const Comment = ({ author, date, content }) => {
    return (
        <div className="comment">
            <div className="comment-header">
                <strong>{author}</strong> <span>{date}</span>
            </div>
            <div className="comment-content">{content}</div>
        </div>
    );
};

export default Comment;
