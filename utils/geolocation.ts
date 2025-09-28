
import type { Coordinates } from '../types';

/**
 * Calculates the distance between two geographical points in kilometers using the Haversine formula.
 * @param from - The starting coordinates.
 * @param to - The destination coordinates.
 * @returns The distance in kilometers.
 */
export function getDistanceInKm(from: Coordinates, to: Coordinates): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(to.lat - from.lat);
  const dLon = deg2rad(to.lng - from.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(from.lat)) * Math.cos(deg2rad(to.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
