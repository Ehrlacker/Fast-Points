import polyline from '@mapbox/polyline';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { toast } from 'react-toastify';
import { parkProps, Trip } from '../types';
import { drawRouteOnMap } from '../Utils/drawRouteOnMap';

export const handleSelectedWaypoint = (
    event: React.ChangeEvent<HTMLSelectElement>,
    parkCoordinates: parkProps[],
    setSelectedWaypoint: React.Dispatch<React.SetStateAction<parkProps | undefined>>
) => {
    event.preventDefault();
    const selectedName = event.currentTarget.value;
    const selectedPark = parkCoordinates.find(park => park.name === selectedName);
    if (selectedPark) {
        setSelectedWaypoint(selectedPark);
    }
};

export const handleStart = (event: React.ChangeEvent<HTMLSelectElement>,
    parkCoordinates: parkProps[],
    setStart: React.Dispatch<React.SetStateAction<parkProps | undefined>>) => {
    const selectedName = event.target.value;
    const selectedPark = parkCoordinates.find(park => park.name === selectedName);
    if (selectedPark) {
        setStart(selectedPark);
    }
}

export const handleEnd = (event: React.ChangeEvent<HTMLSelectElement>,
    parkCoordinates: parkProps[],
    setEnd: React.Dispatch<React.SetStateAction<parkProps | undefined>>) => {
    const selectedName = event.target.value;
    const selectedPark = parkCoordinates.find(park => park.name === selectedName);
    if (selectedPark) {
        setEnd(selectedPark);
    }
}


export const handleAddWaypoint = (
    selectedWaypoint: parkProps | undefined,
    waypoints: parkProps[],
    setWaypoints: React.Dispatch<React.SetStateAction<parkProps[]>>,
    setSelectedWaypoint: React.Dispatch<React.SetStateAction<parkProps | undefined>>,
) => {
    if (selectedWaypoint) {
        const waypointExists = waypoints.some(waypoint => waypoint.id === selectedWaypoint.id);
        if (!waypointExists) {
            setWaypoints(prev => [...prev, selectedWaypoint]);
            toast(`${selectedWaypoint.name} added to route`);
        } else {
            toast(`${selectedWaypoint.name} already added to route`);
        }
        setSelectedWaypoint(undefined);
    }
};

export const handleOptimizeRoute = async (
    start: parkProps | undefined,
    end: parkProps | undefined,
    waypoints: parkProps[],
    setSelectorFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setTrips: React.Dispatch<React.SetStateAction<Trip[]>>,
    mapRef: React.RefObject<mapboxgl.Map>

) => {
    if (!start || !end || waypoints.length === 0) {
        toast("Please select a starting point, ending point, and at least one waypoint.");
        return;
    }
    const coordinates = [start.coordinates, ...waypoints.map(wp => wp.coordinates), end.coordinates].join(';');
    try {
        const response = await axios.get(`https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coordinates}?source=first&destination=last&roundtrip=false&steps=true&access_token=${mapboxgl.accessToken}`);

        if (response.data.code === "Ok") {
            setTrips(response.data.trips)
            const optimizedRoute = polyline.decode(response.data?.trips[0]?.geometry)

            const latLongReversed = optimizedRoute.map((coordinatePair) => {
                const [lat, long] = coordinatePair;
                return [long, lat];
            })
            drawRouteOnMap(mapRef.current, latLongReversed);
            setSelectorFormOpen(false)
        } else {
            toast("Error optimizing the route. Please try again.");
        }

    } catch (error) {
        toast("Error optimizing the route. Please try again.");
    }
};




