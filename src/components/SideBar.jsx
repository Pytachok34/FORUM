import React, {useContext, useState} from 'react';
import { ThemeContext} from "../context/ThemeContext";
import AuthModal from "./AuthModal";

const SideBar = () => {
    const [modalMode, setModalMode] = useState(null);
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const { darkMode, setDarkMode, largeFont, setLargeFont } = useContext(ThemeContext);

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
                            <li>
                                <button onClick={handleLogout}>Выйти</button>
                            </li>
                            <li><a href="#">Категории</a></li>
                        </>
                    ) : (
                        <>
                            <li>
                                <button onClick={() => setModalMode('login')}>Войти</button>
                            </li>
                            <li>
                                <button onClick={() => setModalMode('register')}>Регистрация</button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <div className="settings">
                <h4>Настройки</h4>
                <label>
                    <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                    />
                    Тёмная тема
                </label>
                <h1></h1>
                <label>
                    <input
                        type="checkbox"
                        checked={largeFont}
                        onChange={() => setLargeFont(!largeFont)}
                    />
                    Увеличенный шрифт
                </label>
            </div>
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
