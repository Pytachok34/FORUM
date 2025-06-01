import React from 'react';

const AuthButtons = ({ isMobile }) => (
    <>
        <button
            onClick={() => alert('Открыть модальное окно Вход')}
            className={`px-4 py-2 rounded hover:bg-blue-800 ${isMobile ? 'text-left' : ''}`}
        >
            Вход
        </button>
        <button
            onClick={() => alert('Открыть модальное окно Регистрация')}
            className={`px-4 py-2 bg-white text-blue-800 rounded hover:bg-blue-100 ${isMobile ? 'text-left' : ''}`}
        >
            Регистрация
        </button>
    </>
);

export default AuthButtons;
