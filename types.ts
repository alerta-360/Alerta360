
export type IncidentType = 'Bloqueo' | 'Incendio Forestal' | 'Accidente de Tránsito' | 'Tráfico Pesado';

export const INCIDENT_TYPES: IncidentType[] = ['Bloqueo', 'Incendio Forestal', 'Accidente de Tránsito', 'Tráfico Pesado'];

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Incident {
  id: string;
  type: IncidentType;
  location: Coordinates;
  description?: string;
  timestamp: number;
}
