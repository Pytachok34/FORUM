// src/components/CommentForm.jsx
import React, { useState } from 'react';
import '../assets/CommentForm.css';

const CommentForm = ({ onAddComment, isAuthenticated }) => {
    const [content, setContent] = useState('');
    const [showAuthAlert, setShowAuthAlert] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            setShowAuthAlert(true);
            return;
        }

        if (!content.trim()) return;

        try {
            await onAddComment(content);
            setContent('');
        } catch (error) {
            console.error('Ошибка при отправке комментария:', error);
        }
    };

    const closeAuthAlert = () => {
        setShowAuthAlert(false);
    };

    return (
        <div className="comment-form-container">
            {showAuthAlert && (
                <div className="auth-alert">
                    <div className="auth-alert-content">
                        <p>Чтобы оставить комментарий, пожалуйста, зарегистрируйтесь или войдите.</p>
                        <button onClick={closeAuthAlert}>Понятно</button>
                    </div>
                </div>
            )}

            <form className="comment-form" onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Напишите комментарий..."
                    rows="4"
                />
                <button type="submit" className="submit-comment">
                    Добавить комментарий
                </button>
            </form>
        </div>
    );
};

export default CommentForm;
