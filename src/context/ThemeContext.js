import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [largeFont, setLargeFont] = useState(false);

    useEffect(() => {
        document.body.className = '';
        if (darkMode) document.body.classList.add('dark');
        if (largeFont) document.body.classList.add('large-font');
    }, [darkMode, largeFont]);

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode, largeFont, setLargeFont }}>
            {children}
        </ThemeContext.Provider>
    );
};
