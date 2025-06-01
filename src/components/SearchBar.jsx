import React from 'react';

const SearchBar = () => (
    <div className="container mx-auto px-4 pb-3">
        <div className="relative">
            <input
                type="text"
                placeholder="Поиск по форуму..."
                className="w-full px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-2 text-gray-500">
                <i className="fas fa-search"></i>
            </button>
        </div>
    </div>
);

export default SearchBar;
