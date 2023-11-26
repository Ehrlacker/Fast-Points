
export type parkProps={
id: string;
name:string; 
type: string;
coordinates: [number, number] 
}

export type parkCoordinatePoints={
    coordinates: [number, number]
}


export interface New {
    code:      string;
    waypoints: Waypoint[];
    trips:     Trip[];
}

export interface Trip {
    geometry:    string;
    legs:        Leg[];
    weight_name: string;
    weight:      number;
    duration:    number;
    distance:    number;
}

export interface Leg {
    steps:    Step[];
    summary:  string;
    weight:   number;
    duration: number;
    distance: number;
}

export interface Step {
    geometry:      string;
    maneuver:      Maneuver;
    mode:          string;
    driving_side:  string;
    name:          string;
    intersections: Intersection[];
    weight:        number;
    duration:      number;
    distance:      number;
}

export interface Intersection {
    out?:     number;
    entry:    boolean[];
    bearings: number[];
    location: number[];
    in?:      number;
}

export interface Maneuver {
    bearing_after:  number;
    bearing_before: number;
    location:       number[];
    modifier?:      string;
    type:           string;
    instruction:    string;
}

export interface Waypoint {
    distance:       number;
    name:           string;
    location:       number[];
    waypoint_index: number;
    trips_index:    number;
}