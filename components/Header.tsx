
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="absolute top-0 left-0 right-0 bg-blue-900/80 backdrop-blur-sm text-white p-4 shadow-md flex items-center justify-between z-[1000]">
            <div className="flex items-center">
                <img src="/alerta360.jpeg" alt="Alerta360 Logo" className="h-10 w-auto" />
                <h1 className="text-2xl font-bold ml-3">Alerta360</h1>
            </div>
            <img src="/uepg.jpeg" alt="Logo UEP Gloria" className="h-12 w-12 rounded-full object-cover" />
        </header>
    );
};
