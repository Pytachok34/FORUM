import React from 'react';

const SideBar = () => {
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li><a href="#">Главная</a></li>
                    <li><a href="#">Категории</a></li>
                    <li><a href="#">Пользователи</a></li>
                    <li><a href="#">Настройки</a></li>
                </ul>
            </nav>
        </aside>
    );
};

export default SideBar;
