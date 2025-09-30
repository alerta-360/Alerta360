
import React, { useState, useEffect, useCallback } from 'react';
import type { LatLng } from 'leaflet';
import { Header } from './components/Header';
import { MapComponent } from './components/MapComponent';
import { ReportModal } from './components/ReportModal';
import { Notification } from './components/Notification';
import type { Incident, IncidentType, Coordinates } from './types';
import { getDistanceInKm } from './utils/geolocation';

const SANTA_CRUZ_COORDS: Coordinates = { lat: -17.7833, lng: -63.1833 };

const App: React.FC = () => {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
    const [mapCenter, setMapCenter] = useState<Coordinates>(SANTA_CRUZ_COORDS);
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

    const handleMapClick = (latlng: LatLng) => {
        setReportLocation({ lat: latlng.lat, lng: latlng.lng });
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
        setReportLocation(null);
    };

    return (
        <div className="h-screen w-screen relative">
            <MapComponent 
                center={mapCenter} 
                userLocation={userLocation}
                incidents={incidents}
                onMapClick={handleMapClick}
                reportLocation={reportLocation}
            />
            <Header />
            
             {reportLocation && (
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
    );
};

export default App;