// LoginModal.jsx
import React, { useState } from 'react';

const LoginModal = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        // TODO: здесь сделать запрос на сервер для логина
        console.log('Login:', { username, password });
        onClose(); // Закрыть окно после отправки
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Войти</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Логин"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Войти</button>
                    <button type="button" onClick={onClose}>Отмена</button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
