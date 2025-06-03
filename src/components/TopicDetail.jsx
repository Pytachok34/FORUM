//src/components/TopicDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/TopicDetail.css';
import SideBar from './SideBar';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const TopicDetail = () => {
    const { id } = useParams();
    const [topic, setTopic] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/topics/${id}`);
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`Ошибка загрузки темы: ${text}`);
                }
                const data = await res.json();

                setTopic(data.topic);
                setComments(data.comments);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTopic();
    }, [id]);

    const addComment = async (content) => {
        try {
            const token = localStorage.getItem('token');

            // Улучшенная проверка токена
            if (!token) {
                throw new Error('Пожалуйста, войдите чтобы оставить комментарий');
            }

            // Проверка базового формата JWT
            if (!token.startsWith('eyJ') || token.split('.').length !== 3) {
                localStorage.removeItem('token');
                throw new Error('Неверный формат токена. Пожалуйста, войдите снова.');
            }

            const res = await fetch(`http://localhost:5000/api/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ topic_id: id, content }),
            });

            // Специальная обработка ошибок авторизации
            if (res.status === 401 || res.status === 403) {
                localStorage.removeItem('token');
                window.location.reload();
                throw new Error('Сессия истекла. Пожалуйста, войдите снова.');
            }

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || 'Ошибка при добавлении комментария');
            }

            const newComment = await res.json();
            setComments(prev => [...prev, newComment]);

        } catch (error) {
            console.error('Error adding comment:', error);
            alert(error.message);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <h2 className="loading-text">Загрузка темы...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="topic-detail-container">
                <SideBar />
                <main className="topic-detail-main">
                    <p>{error}</p>
                </main>
            </div>
        );
    }

    return (
        <div className="topic-detail-container">
            <SideBar />
            <main className="topic-detail-main">
                <div className="main-topic">
                    <h1>{topic.title}</h1>
                    <div className="topic-meta">
                        Автор: {topic.author} | Дата: {new Date(topic.created_at).toLocaleString()}
                    </div>
                    <p>{topic.content}</p>
                </div>

                <hr />

                <div className="comments-section">
                    <h3>Комментарии:</h3>
                    <CommentList comments={comments} />
                    <CommentForm
                        onAddComment={addComment}
                        isAuthenticated={Boolean(localStorage.getItem('token'))}
                    />
                </div>
            </main>
        </div>
    );
};

export default TopicDetail;
