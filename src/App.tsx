import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import SelectorForm from './components/SelectorForm/SelectorForm';
import parkLocations from './Arrays/parkLocations'
import { parkProps } from './types'
import polyline from '@mapbox/polyline'
import axios from 'axios';
import './App.css'


mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;



const App = () => {

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [waypoints, setWaypoints] = useState<parkProps[]>([]);
  const [start, setStart] = useState<parkProps>();
  const [end, setEnd] = useState<parkProps>();
  const [selectedWaypoint, setSelectedWaypoint] = useState<parkProps>();
  const parkCoordinates = parkLocations
  const [lng] = useState(-78.84650);
  const [lat] = useState(35.73357);


  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [lng, lat],
      zoom: 14
    });


    if (mapRef.current) {
      (mapRef.current as mapboxgl.Map).on('load', async () => {

        (mapRef.current as mapboxgl.Map).addSource('route', {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              'coordinates': []
            }
          }
        });

        (mapRef.current as mapboxgl.Map).addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'route',
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#1db7dd',
            'line-width': 5
          }
        });


        (mapRef.current as mapboxgl.Map).addLayer(
          {
          id: 'routearrows',
          type: 'symbol',
          source: 'route',
          layout: {
          'symbol-placement': 'line',
          'text-field': '▶',
          'text-size': [
          'interpolate',
          ['linear'],
          ['zoom'],
          12,
          24,
          22,
          60
          ],
          'symbol-spacing': [
          'interpolate',
          ['linear'],
          ['zoom'],
          12,
          30,
          22,
          160
          ],
          'text-keep-upright': false
          },
          paint: {
          'text-color': '#3887be',
          'text-halo-color': 'hsl(55, 11%, 96%)',
          'text-halo-width': 3
          }
          },
          'waterway-label'
          );


          (mapRef.current as mapboxgl.Map).addSource('start-point', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'Point',
                    'coordinates': [0, 0] 
                }
            }
        });
    
        (mapRef.current as mapboxgl.Map).addLayer({
            'id': 'start-point-layer',
            'type': 'circle',
            'source': 'start-point',
            'paint': {
                'circle-radius': 7,
                'circle-color': 'green'
            }
        });
    

        (mapRef.current as mapboxgl.Map).addSource('end-point', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'Point',
                    'coordinates': [0, 0]  
                }
            }
        });
    
        (mapRef.current as mapboxgl.Map).addLayer({
            'id': 'end-point-layer',
            'type': 'circle',
            'source': 'end-point',
            'paint': {
                'circle-radius': 7,
                'circle-color': 'red'
            }
        });


        (mapRef.current as mapboxgl.Map).addSource('way-point', {
          'type': 'geojson',
          'data': {
              'type': 'Feature',
              'properties': {},
              'geometry': {
                  'type': 'Point',
                  'coordinates': [0, 0]  
              }
          }
      });
  
      (mapRef.current as mapboxgl.Map).addLayer({
          'id': 'way-point-layer',
          'type': 'circle',
          'source': 'way-point',
          'paint': {
              'circle-radius': 7,
              'circle-color': 'blue'
          }
      });

      });
    }
    return () => (mapRef.current as mapboxgl.Map).remove();
  }, []);




  useEffect(() => {
    if (start && mapRef.current) {
      const startSource = mapRef.current.getSource('start-point') as mapboxgl.GeoJSONSource;
      if (startSource) {
          startSource.setData({
              'type': 'Feature',
              'properties': {},
              'geometry': {
                  'type': 'Point',
                  'coordinates': start.coordinates
              }
          });
      }
    }
  
    if (end && mapRef.current) {
      const endSource = mapRef.current.getSource('end-point') as mapboxgl.GeoJSONSource;
      if (endSource) {
          endSource.setData({
              'type': 'Feature',
              'properties': {},
              'geometry': {
                  'type': 'Point',
                  'coordinates': end.coordinates
              }
          });
      }
    }


    if (mapRef.current) {
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
  
      const waypointsSource = mapRef.current?.getSource('way-point') as mapboxgl.GeoJSONSource | undefined;
      if (waypointsSource) {
          waypointsSource.setData(waypointsData);
      }
    }


  }, [start, end, mapRef.current, waypoints]);




  const handleAddWaypoint = () => {
    if (selectedWaypoint) {
      setWaypoints(prev => [...prev, selectedWaypoint]);
    }
  };

  const handleSelectedWaypoint = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const selectedName = e.currentTarget.value;
    const selectedPark = parkCoordinates.find(park => park.name === selectedName);
    if (selectedPark) {
      setSelectedWaypoint(selectedPark);
    }
  }

  const handleStart = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const selectedPark = parkCoordinates.find(park => park.name === selectedName);
    if (selectedPark) {
      setStart(selectedPark);
    }
  }

  const handleEnd = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const selectedPark = parkCoordinates.find(park => park.name === selectedName);
    if (selectedPark) {
      setEnd(selectedPark);
    }
  }


  const handleOptimizeRoute = async () => {
    console.log(waypoints)
    if (!start || !end || waypoints.length === 0) {
      alert("Please select a starting point, ending point, and at least one waypoint.");
      return;
    }

    const coordinates = [start.coordinates, ...waypoints.map(wp => wp.coordinates), end.coordinates].join(';');

    try {
      const response = await axios.get(`https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coordinates}?source=first&destination=last&access_token=${mapboxgl.accessToken}`);
      console.log(response.data)


      if (response.data.code === "Ok") {
        const optimizedRoute = polyline.decode(response.data?.trips[0]?.geometry);
        const latLongReversed = optimizedRoute.map((coordinatePair) => {
          const [lat, long] = coordinatePair;
          return [long, lat];
        })
        console.log("Optimized route coordinates:", optimizedRoute);
        console.log("reversed", latLongReversed)
        drawRouteOnMap(latLongReversed);
      } else {
        alert("Error optimizing the route. Please try again.");
      }

    } catch (error) {
      alert("Error optimizing the route. Please try again.");
      console.error("Error with the Mapbox Optimization API:", error);
    }
  };


  const drawRouteOnMap = (coordinates: number[][]) => {
    const mapInstance = mapRef.current;
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
    }
    else {
      console.log('Map instance is not available.');
    }
  }



  return (
    <div>
      <div id="map" style={{ width: "100vw", height: "100vh" }}></div>
      <SelectorForm
        start={start}
        end={end}
        selectedWaypoint={selectedWaypoint}
        handleEnd={handleEnd}
        handleStart={handleStart}
        handleSelectedWaypoint={handleSelectedWaypoint}
        onAddWaypoint={handleAddWaypoint}
        onOptimizeRoute={handleOptimizeRoute}
        waypoints={waypoints}
      />
    </div>
  )
}

export default App
