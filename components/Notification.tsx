
import React, { useEffect } from 'react';

interface NotificationProps {
    message: string;
    onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000); // Auto-close after 5 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg z-[1000] flex items-center gap-4 animate-bounce">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{message}</span>
            <button onClick={onClose} className="text-white font-bold">&times;</button>
        </div>
    );
};
