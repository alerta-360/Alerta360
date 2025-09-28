
import React from 'react';

interface InstructionsProps {
    onClose: () => void;
}

export const Instructions: React.FC<InstructionsProps> = ({ onClose }) => {
    return (
        <div className="bg-blue-800 text-white p-4 rounded-lg shadow-lg animate-fade-in-down flex items-start gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
                <p className="font-bold">Modo de Reporte Activado</p>
                <p className="text-sm">Haga clic en el mapa para establecer la ubicación del incidente.</p>
            </div>
            <button onClick={onClose} className="text-blue-200 hover:text-white font-bold text-2xl leading-none">&times;</button>
        </div>
    );
};
