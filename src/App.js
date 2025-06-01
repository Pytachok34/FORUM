import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForumPage from './components/ForumPage';
import TopicDetail from './components/TopicDetail';
import {ThemeProvider} from "./context/ThemeContext";



function App() {
    return (
        <ThemeProvider>
        <Router>
            <Routes>
                <Route path="/" element={<ForumPage />} />
                <Route path="/topic/:id" element={<TopicDetail />} />
            </Routes>
        </Router>
        </ThemeProvider>
    );
}

export default App;
