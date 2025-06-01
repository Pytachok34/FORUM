import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments }) => {
    if (!comments.length) return <p>Комментариев пока нет.</p>;

    return (
        <div className="comment-list">
            {comments.map((comment, idx) => (
                <Comment
                    key={idx}
                    author={comment.author}
                    date={comment.date}
                    content={comment.content}
                />
            ))}
        </div>
    );
};

export default CommentList;
