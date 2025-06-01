import React, { useState } from 'react';
import SideBar from './SideBar';
import Breadcrumbs from './Breadcrumbs';
import Tabs from './Tabs';
import './ForumPage.css';

import { Link } from 'react-router-dom';


// Пример компонента TopicList с кликабельными темами
const TopicList = ({ topics }) => {
    return (
        <ul className="topic-list">
            {topics.map(topic => (
                <li key={topic.id} className="topic-item">
                    <Link to={`/topic/${topic.id}`} className="topic-link">
                        {topic.title}
                    </Link>
                    <div className="topic-meta">
                        Автор: {topic.author} | Последний комментарий: {topic.lastCommentDate}
                    </div>
                </li>
            ))}
        </ul>
    );
};

const ForumPage = () => {
    const tabs = ['Все темы', 'Мои темы'];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    // Пример фильтрации тем по вкладке
    const allTopics = [
        { id: 1, title: 'Помогите с алгоритмом быстрой сортировки на C++', author: 'Иван Иванов', lastCommentDate: '2025-06-01' },
        { id: 2, title: 'Лабораторная работа №5 по базам данных - сложности с JOIN', author: 'Сергей Кузнецов', lastCommentDate: '2025-06-02' },
    ];

    const filteredTopics = activeTab === 'Все темы' ? allTopics : allTopics.filter(t => t.author === 'Петя');

    return (
        <div className="forum-container">
            <SideBar />
            <main className="main-content">
                <Breadcrumbs paths={['Главная', 'Форум']} />
                <Tabs tabs={tabs} onTabChange={setActiveTab} activeTab={activeTab} />
                <TopicList topics={filteredTopics} />
            </main>
        </div>
    );
};

export default ForumPage;
