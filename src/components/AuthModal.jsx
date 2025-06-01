// src/components/AuthModal.jsx
import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = ({ mode, onClose, onSuccess }) => {
    const isLogin = mode === 'login';
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/users/${isLogin ? 'login' : 'register'}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Ошибка');
            }

            if (isLogin) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
            }

            onSuccess(data.username);
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-modal-backdrop">
            <div className="auth-modal">
                <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            name="username"
                            placeholder="Имя пользователя"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    {error && <p className="auth-error">{error}</p>}
                    <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
                    <button type="button" onClick={onClose} className="cancel">Отмена</button>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;
