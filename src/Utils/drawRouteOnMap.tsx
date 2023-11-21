import mapboxgl from 'mapbox-gl';
import { toast } from 'react-toastify';

export const drawRouteOnMap = (mapInstance: mapboxgl.Map | null, coordinates: number[][]) => {
  if (mapInstance) {
    const routeSource = mapInstance.getSource('route') as mapboxgl.GeoJSONSource;
    if (routeSource) {
      routeSource.setData({
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': coordinates
        }
      });
    }
  } else {
    toast('Map instance is not available.');
  }
};