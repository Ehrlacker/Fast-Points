import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import SelectorForm from './components/SelectorForm/SelectorForm';
import parkLocations from './Arrays/parkLocations'
import { parkProps, Trip } from './types'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClosedSelectorForm from './components/ClosedSelectorForm/ClosedSelectorForm';
import ViewRouteContainer from './components/ViewRouteContainer/ViewRouteContainer';
import { handleAddWaypoint, handleEnd, handleOptimizeRoute, handleSelectedWaypoint, handleStart } from './Handlers/Handlers';
import { setupMapPoints } from './Utils/setupMapPoints'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;



const App = () => {

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [waypoints, setWaypoints] = useState<parkProps[]>([]);
  const [start, setStart] = useState<parkProps>();
  const [end, setEnd] = useState<parkProps>();
  const [Trips, setTrips] = useState<Trip[]>([])
  const [selectedWaypoint, setSelectedWaypoint] = useState<parkProps>();
  const [selectorFormOpen, setSelectorFormOpen] = useState(true)
  const [routeViewable, setRouteViewable] = useState(false)
  const [pointsModal, setPointsModal] = useState(true);
  const [optimizedModal, setOptimizedModal] = useState(false);
  const [directionsModal, setDirectionsModal] = useState(false);
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
    if (mapRef.current) {
      setupMapPoints(mapRef.current, start, end, waypoints);
    }
  }, [start, end, waypoints]);



  return (
    <>
      <div id="map" style={{ width: "100vw", height: "100vh" }}></div>
      <ToastContainer
        position="top-right"
        autoClose={3000} />
      {selectorFormOpen ?
        <SelectorForm
          start={start}
          end={end}
          selectedWaypoint={selectedWaypoint}
          handleEnd={(e) => handleEnd(e, parkCoordinates, setEnd)}
          handleStart={(e) => handleStart(e, parkCoordinates, setStart)}
          handleSelectedWaypoint={(e) => handleSelectedWaypoint(e, parkCoordinates, setSelectedWaypoint)}
          onAddWaypoint={() => handleAddWaypoint(selectedWaypoint, waypoints, setWaypoints, setSelectedWaypoint)}
          onOptimizeRoute={() => handleOptimizeRoute(start, end, waypoints, setSelectorFormOpen, setTrips, mapRef)}
          viewRoute={() => { setRouteViewable(true) }}
        />
        : <ClosedSelectorForm
          onClick={() => setSelectorFormOpen(true)} />}

      {routeViewable ?
        <ViewRouteContainer
          setState={setWaypoints}
          viewRouteFalse={() => {setRouteViewable(false)}}
          routeStart={start}
          routePoints={waypoints}
          routeEnd={end}
          PointsModal={pointsModal}
          setPointsModal={setPointsModal}
          OptimizedModal={optimizedModal}
          setOptimizedModal={setOptimizedModal}
          DirectionsModal={directionsModal}
          setDirectionsModal={setDirectionsModal}
          TripArray={Trips}
        /> : null}


    </>
  )
}

export default App
