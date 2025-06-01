import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForumPage from './components/ForumPage';
import TopicDetail from './components/TopicDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ForumPage />} />
                <Route path="/topic/:topicId" element={<TopicDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
