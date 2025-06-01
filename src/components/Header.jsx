import React, { useState } from 'react';
import SearchBar from './SearchBar';
import MobileMenu from './MobileMenu';
import AuthButtons from './AuthButtons';

const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="gradient-bg text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <i className="fas fa-laptop-code text-2xl"></i>
                    <h1 className="text-xl font-bold">Форум кафедры МО ЭВМ</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={() => setShowSearch(!showSearch)} className="p-2 rounded-full hover:bg-blue-800">
                        <i className="fas fa-search"></i>
                    </button>
                    <div className="hidden md:flex space-x-2">
                        <AuthButtons />
                    </div>
                    <div className="hidden items-center space-x-2 cursor-pointer" id="userMenu">
                        <img src="https://via.placeholder.com/40" alt="User" className="rounded-full" />
                        <span className="font-medium">Иван Иванов</span>
                        <i className="fas fa-chevron-down text-xs"></i>
                    </div>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-full hover:bg-blue-800">
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
            </div>

            {showSearch && <SearchBar />}
            {mobileMenuOpen && <MobileMenu />}
        </header>
    );
};

export default Header;
