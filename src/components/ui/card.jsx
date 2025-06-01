// src/components/ui/card.jsx

import React from 'react';

const Card = ({ children, className = '', style = {} }) => {
    return (
        <div
            className={`bg-white shadow rounded-md p-4 ${className}`}
            style={style}
        >
            {children}
        </div>
    );
};

export default Card;
