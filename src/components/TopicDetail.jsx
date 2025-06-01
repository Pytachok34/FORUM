import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './TopicDetail.css'

const TopicDetail = ({ topic, comments, onAddComment }) => {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(newComment.trim());
            setNewComment('');
        }
    };
    if (!topic) {
        return (
            <div className="loading-container">
                <span className="loading-text">Загрузка темы...</span>
            </div>
        );
    }
    return (
        <div className="topic-detail-container">
            <main className="topic-detail-main">
                <section className="main-topic">
                    <h1>{topic.title}</h1>
                    <div className="topic-meta">
                        Автор: {topic.author} | Создано: {topic.createdAt}
                    </div>
                    <p>{topic.content}</p>
                </section>

                <section className="comments-section">
                    <h2>Комментарии</h2>
                    {comments.length === 0 && <p>Пока нет комментариев.</p>}
                    {comments.map((comment) => (
                        <div key={comment.id} className="comment">
                            <div className="comment-header">
                                {comment.author} | {comment.date}
                            </div>
                            <div className="comment-content">{comment.text}</div>
                        </div>
                    ))}

                    <form className="comment-form" onSubmit={handleSubmit}>
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Написать комментарий..."
                rows={4}
            />
                        <button type="submit">Отправить</button>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default TopicDetail;
