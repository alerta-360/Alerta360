import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import type { LatLng } from 'leaflet';
import L from 'leaflet';
import type { Incident, Coordinates, IncidentType } from '../types';

import { BlockadeIcon, FireIcon, AccidentIcon, TrafficIcon, UserLocationIcon, ReportLocationIcon } from './icons/IncidentIcons';

const getIconForIncident = (type: IncidentType) => {
    const iconHtml = {
        'Bloqueo': BlockadeIcon,
        'Incendio Forestal': FireIcon,
        'Accidente de Tránsito': AccidentIcon,
        'Tráfico Pesado': TrafficIcon,
    }[type]();

    return new L.DivIcon({
        html: iconHtml,
        className: 'bg-transparent border-0',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
    });
};

const UserMarkerIcon = new L.DivIcon({
    html: UserLocationIcon(),
    className: 'bg-transparent border-0',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
});

const ReportMarkerIcon = new L.DivIcon({
    html: ReportLocationIcon(),
    className: 'bg-transparent border-0',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

interface ChangeViewProps {
    center: Coordinates;
}

const ChangeView: React.FC<ChangeViewProps> = ({ center }) => {
    const map = useMap();
    map.setView([center.lat, center.lng]);
    return null;
};

interface MapEventsProps {
    onMapClick: (latlng: LatLng) => void;
}

const MapEvents: React.FC<MapEventsProps> = ({ onMapClick }) => {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng);
        },
    });
    return null;
};

interface MapComponentProps {
    center: Coordinates;
    userLocation: Coordinates | null;
    incidents: Incident[];
    onMapClick: (latlng: LatLng) => void;
    reportLocation: Coordinates | null;
}

export const MapComponent: React.FC<MapComponentProps> = ({ center, userLocation, incidents, onMapClick, reportLocation }) => {
    return (
        <MapContainer center={[center.lat, center.lng]} zoom={13} scrollWheelZoom={true}>
            <ChangeView center={center} />
            <MapEvents onMapClick={onMapClick} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {userLocation && (
                <Marker position={[userLocation.lat, userLocation.lng]} icon={UserMarkerIcon}>
                    <Popup>Tu ubicación actual</Popup>
                </Marker>
            )}
            {incidents.map(incident => (
                <Marker key={incident.id} position={[incident.location.lat, incident.location.lng]} icon={getIconForIncident(incident.type)}>
                    <Popup>
                        <div className="font-sans">
                            <h3 className="font-bold text-base mb-1">{incident.type}</h3>
                            {incident.description && <p className="text-sm">{incident.description}</p>}
                            <p className="text-xs text-gray-500 mt-2">{new Date(incident.timestamp).toLocaleString()}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
             {reportLocation && (
                <Marker position={[reportLocation.lat, reportLocation.lng]} icon={ReportMarkerIcon} />
            )}
        </MapContainer>
    );
};