
import React, { useState, useEffect, useCallback } from 'react';
import type { LatLng } from 'leaflet';
import { Header } from './components/Header';
import { MapComponent } from './components/MapComponent';
import { ReportModal } from './components/ReportModal';
import { Notification } from './components/Notification';
import { Instructions } from './components/Instructions';
import type { Incident, IncidentType, Coordinates } from './types';
import { getDistanceInKm } from './utils/geolocation';

const SANTA_CRUZ_COORDS: Coordinates = { lat: -17.7833, lng: -63.1833 };

const App: React.FC = () => {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
    const [mapCenter, setMapCenter] = useState<Coordinates>(SANTA_CRUZ_COORDS);
    const [isReporting, setIsReporting] = useState(false);
    const [reportLocation, setReportLocation] = useState<Coordinates | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords: Coordinates = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setUserLocation(coords);
                setMapCenter(coords);
            },
            (error) => {
                console.error("Error getting user location:", error.message);
                // Keep map centered on Santa Cruz if location is denied
            }
        );
    }, []);

    const handleNewIncident = useCallback((newIncident: Incident) => {
        setIncidents(prevIncidents => [...prevIncidents, newIncident]);
        if (userLocation) {
            const distance = getDistanceInKm(userLocation, newIncident.location);
            const isSevere = newIncident.type === 'Bloqueo' || newIncident.type === 'Incendio Forestal';
            if (isSevere && distance <= 5) {
                setNotification(`¡Alerta! Nuevo incidente (${newIncident.type}) a ${distance.toFixed(1)} km de tu ubicación.`);
            }
        }
    }, [userLocation]);

    const startReporting = () => {
        setIsReporting(true);
    };

    const handleMapClick = (latlng: LatLng) => {
        if (isReporting) {
            setReportLocation({ lat: latlng.lat, lng: latlng.lng });
        }
    };

    const submitReport = (type: IncidentType, description: string) => {
        if (!reportLocation) return;

        const newIncident: Incident = {
            id: new Date().toISOString(),
            type,
            description,
            location: reportLocation,
            timestamp: Date.now(),
        };

        handleNewIncident(newIncident);
        cancelReporting();
    };
    
    const cancelReporting = () => {
        setIsReporting(false);
        setReportLocation(null);
    };

    return (
        <div className="h-screen w-screen flex flex-col bg-gray-100">
            <Header />
            <div className="relative flex-grow">
                <MapComponent 
                    center={mapCenter} 
                    userLocation={userLocation}
                    incidents={incidents}
                    onMapClick={handleMapClick}
                    isReporting={isReporting}
                    reportLocation={reportLocation}
                />
                <div className="absolute top-4 right-4 z-[500] flex flex-col items-end gap-4">
                    <button
                        onClick={startReporting}
                        className="bg-yellow-400 text-blue-900 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-500 transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
                    >
                        Reportar Incidente
                    </button>
                    {isReporting && <Instructions onClose={cancelReporting} />}
                </div>
                 {reportLocation && isReporting && (
                    <ReportModal
                        onSubmit={submitReport}
                        onClose={cancelReporting}
                    />
                )}
                {notification && (
                    <Notification 
                        message={notification} 
                        onClose={() => setNotification(null)} 
                    />
                )}
            </div>
        </div>
    );
};

export default App;
