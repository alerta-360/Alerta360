
import React, { useState } from 'react';
import type { IncidentType } from '../types';
import { INCIDENT_TYPES } from '../types';

interface ReportModalProps {
    onSubmit: (type: IncidentType, description: string) => void;
    onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ onSubmit, onClose }) => {
    const [type, setType] = useState<IncidentType>('Bloqueo');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(type, description);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
            <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-md m-4">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Reportar Incidente</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="incident-type" className="block text-gray-700 font-bold mb-2">
                            Tipo de Incidente
                        </label>
                        <select
                            id="incident-type"
                            value={type}
                            onChange={(e) => setType(e.target.value as IncidentType)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {INCIDENT_TYPES.map(it => <option key={it} value={it}>{it}</option>)}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                            Descripción (Opcional)
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Añada detalles adicionales aquí..."
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-800 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-900 transition-colors"
                        >
                            Enviar Reporte
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
