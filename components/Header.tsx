
import React from 'react';

const LogoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
);


export const Header: React.FC = () => {
    return (
        <header className="bg-blue-900 text-white p-4 shadow-md flex items-center z-50">
            <LogoIcon />
            <h1 className="text-2xl font-bold ml-3">Alerta360</h1>
        </header>
    );
};
