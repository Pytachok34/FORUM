import React, { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import AuthModal from "./AuthModal";

const SideBar = () => {
    const [modalMode, setModalMode] = useState(null);
    const [username, setUsername] = useState(localStorage.getItem('username') || '');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername('');
    };
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li><a href="/">Главная</a></li>
                    {username ? (
                        <>
                        <li><span>👤 {username}</span></li>
                        <li><button onClick={handleLogout}>Выйти</button></li>
                    <li><a href="#">Категории</a></li>
                    <li><a href="#">Настройки</a></li>
                        </>
                    ) : (
                        <>
                            <li><button onClick={() => setModalMode('login')}>Войти</button></li>
                            <li><button onClick={() => setModalMode('register')}>Регистрация</button></li>
                        </>
                    )}
                </ul>
            </nav>
            {modalMode && (
                <AuthModal
                    mode={modalMode}
                    onClose={() => setModalMode(null)}
                    onSuccess={(name) => setUsername(name)}
                />
            )}
        </aside>

    );
};

export default SideBar;
