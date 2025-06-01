import React, { useState } from 'react';

const Tabs = ({ tabs, onTabChange }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (index) => {
        setActiveIndex(index);
        if (onTabChange) onTabChange(index);
    };

    return (
        <div className="tabs">
            {tabs.map((tab, idx) => (
                <button
                    key={idx}
                    className={`tab ${activeIndex === idx ? 'active' : ''}`}
                    onClick={() => handleClick(idx)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
