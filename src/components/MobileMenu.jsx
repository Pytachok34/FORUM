import React from 'react';
import AuthButtons from './AuthButtons';

const MobileMenu = () => (
    <div className="md:hidden bg-blue-900 px-4 py-2">
        <div className="flex flex-col space-y-2">
            <AuthButtons isMobile />
        </div>
    </div>
);

export default MobileMenu;
