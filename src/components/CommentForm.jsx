import React, { useState } from 'react';

const CommentForm = ({ onAddComment }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        onAddComment(content);
        setContent('');
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Напишите комментарий..."
          rows="4"
      />
            <button type="submit">Добавить комментарий</button>
        </form>
    );
};

export default CommentForm;
