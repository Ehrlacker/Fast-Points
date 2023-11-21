import mapboxgl from 'mapbox-gl';
import { parkProps } from '../types';

export function setupMapPoints(
  map: mapboxgl.Map,
  start: parkProps | undefined,
  end: parkProps | undefined,
  waypoints: parkProps[]
): void {

  if (start) {
    const startSource = map.getSource('start-point') as mapboxgl.GeoJSONSource;
    startSource?.setData({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: start.coordinates
      }
    });
  }


  if (end) {
    const endSource = map.getSource('end-point') as mapboxgl.GeoJSONSource;
    endSource?.setData({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: end.coordinates
      }
    });
  }


  const waypointsData: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: waypoints.map(waypoint => ({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: waypoint.coordinates
      }
    }))
  };
  const waypointsSource = map.getSource('way-point') as mapboxgl.GeoJSONSource;
  waypointsSource?.setData(waypointsData);
}