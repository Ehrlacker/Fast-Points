import { useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import { point, featureCollection } from '@turf/turf'

import './App.css'
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;



const App = () => {

  const parkHomeLocation = [-78.84650, 35.73357];
  const startingLocation = []
  const endingLocation = []

  const [lng, setLng] = useState(-78.84650);

  const [lat, setLat] = useState(35.73357);


  //Profile = mapbox/driving-traffic
  //Coordinates = Coordinate pairs

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [lng, lat],
      zoom: 14
    });

    const parkHome = featureCollection([point(parkHomeLocation)]);



    const dropoffs = featureCollection([]);
    const nothing = featureCollection([]);

    const getWaypoints = async () => {
      const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${12345}?access_token=${mapboxgl.accessToken}`
      const response = await fetch(url)
      const resJSON = await response.json()
      setWaypoints(resJSON.data)
    }


    map.on('load', async () => {
      map.addLayer({
        id: 'parkHome',
        type: 'circle',
        source: {
          data: parkHome,
          type: 'geojson'
        },
        paint: {
          'circle-radius': 10,
          'circle-color': 'red',
          'circle-stroke-color': 'white',
          'circle-stroke-width': 3
        }
      });

      map.addLayer({
        id: 'parkHome-symbol',
        type: 'symbol',
        source: {
          data: parkHome,
          type: 'geojson'
        },
        layout: {
          'icon-image': 'grocery-15',
          'icon-size': 1
        },
        paint: {
          'text-color': '#3887be'
        }
      });

      map.addLayer({
        id: 'dropoffs-symbol',
        type: 'symbol',
        source: {
          data: dropoffs as any,
          type: 'geojson'
        },
        layout: {
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
          'icon-image': 'marker-15'
        }
      });

      map.addSource('route', {
        type: 'geojson',
        data: nothing as any
      });

      map.addLayer(
        {
          id: 'routeline-active',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': ['interpolate', ['linear'], ['zoom'], 12, 3, 22, 12]
          }
        },
        'waterway-label'
      );

      map.addLayer(
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

      await map.on('click', addWaypoints);

    });



    const addWaypoints = async (event: { point: mapboxgl.PointLike; }) => {
      // When the map is clicked, add a new drop off point
      // and update the `dropoffs-symbol` layer
      await newDropoff(map.unproject(event.point));
      updateDropoffs(dropoffs);
    }

    const newDropoff = (coordinates) => {
      const pt = point([coordinates.lng, coordinates.lat], {
        orderTime: Date.now(),
        key: Math.random()
      });
      dropoffs.features.push(pt);
    }

    const uodateDropoffs = (geojson) => {
      map.getSource('dropoffs-symbol').setData(geojson);
    }

    const createOptimizationQuery = () => {
      const coordinates = [parkHomeLocation]
    }


    return () => map.remove();
  }, []);

  return (

    <div>
      <div id="map" style={{ width: "100vw", height: "100vh" }}></div>
    </div>
  )
}

export default App

