import React, {useEffect, useState} from 'react';
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
                    throw new Error('Тема не найдена');
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
            const res = await fetch('http://localhost:5000/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic_id: id, content }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Ошибка при добавлении комментария');
            }

            const newComment = await res.json();
            setComments(prev => [...prev, newComment]);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleAddComment = async (content) => {
        try {
            const res = await fetch(`/api/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic_id: id, content }),
            });

            if (!res.ok) {
                throw new Error('Ошибка при добавлении комментария');
            }

            const newComment = await res.json();
            // Преобразуем дату у нового комментария
            newComment.date = new Date(newComment.created_at).toLocaleString();

            setComments(prev => [...prev, newComment]);
        } catch (err) {
            alert(err.message);
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
                    <CommentForm onAddComment={addComment} />
                </div>
            </main>
        </div>
    );
};

export default TopicDetail;

