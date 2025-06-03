//src/components/ForumPage.jsx
import React, { useState, useEffect } from 'react';
import { fetchTopics } from '../api/topics';
import SideBar from '../components/SideBar';
import Breadcrumbs from '../components/Breadcrumbs';
import TopicList from '../components/TopicList';
import './ForumPage.css';
import { useNavigate } from 'react-router-dom';

const ForumPage = () => {
    const [topics, setTopics] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTopics, setFilteredTopics] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadTopics() {
            try {
                const data = await fetchTopics();
                setTopics(data);
                setFilteredTopics(data);
            } catch (err) {
                setError(err.message);
            }
        }
        loadTopics();
    }, []);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredTopics(topics);
        } else {
            const lowerSearch = searchTerm.toLowerCase();
            const filtered = topics.filter(
                topic =>
                    topic.title.toLowerCase().includes(lowerSearch) ||
                    topic.content.toLowerCase().includes(lowerSearch)
            );
            setFilteredTopics(filtered);
        }
    }, [searchTerm, topics]);

    const handleTopicClick = (id) => {
        navigate(`/topic/${id}`);
    };

    if (error) return <div className="error">{error}</div>;

    return (
        <div className="forum-container">
            <SideBar />
            <main className="main-content">
                <h1 className="forum-title">Форум кафедры МО ЭВМ</h1>
                <Breadcrumbs paths={['Главная', 'Форум']} />

                <input
                    type="text"
                    placeholder="Поиск по темам..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />

                <TopicList
                    topics={filteredTopics}
                    onTopicClick={handleTopicClick}
                />
            </main>
        </div>
    );
};

export default ForumPage;
