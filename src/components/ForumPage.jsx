import React, { useState, useEffect } from 'react';
import { fetchTopics } from '../api/topics';
import SideBar from '../components/SideBar';
import Breadcrumbs from '../components/Breadcrumbs';
import TopicList from '../components/TopicList';
import './ForumPage.css'
import {useNavigate} from "react-router-dom";

const ForumPage = () => {
    const [topics, setTopics] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadTopics() {
            try {
                const data = await fetchTopics();
                setTopics(data);
            } catch (err) {
                setError(err.message);
            } finally {
            }
        }
        loadTopics();
    }, []);
    const handleTopicClick = (id) => {
        navigate(`/topic/${id}`);
    };

    if (error) return <div className="error">{error}</div>;

    return (
        <div className="forum-container">
            <SideBar />
            <main className="main-content">
                <h1 className="forum-title">Форум кафедры МО ЭВМ</h1>
                <Breadcrumbs paths={['Главная', 'Форум']}/>
                {/* ...можно добавить Tabs */}
                <TopicList
                    topics={topics}
                    onTopicClick={handleTopicClick}
                />
            </main>
        </div>
    );
};

export default ForumPage;
