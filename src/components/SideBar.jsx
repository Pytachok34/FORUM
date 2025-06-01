import React, { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const SideBar = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li><a href="/">Главная</a></li>
                    <li><a href="#">Категории</a></li>
                    <li><a href="#">Настройки</a></li>
                    <li>
                        <button onClick={() => setShowLogin(true)}>Войти</button>
                    </li>
                    <li>
                        <button onClick={() => setShowRegister(true)}>Зарегистрироваться</button>
                    </li>
                </ul>
            </nav>
            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
            {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
        </aside>

    );
};

export default SideBar;
