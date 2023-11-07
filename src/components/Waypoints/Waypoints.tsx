import { parkProps } from "../../types"
import { v4 as uuidv4 } from 'uuid';
import './Waypoints.css'


type waypointsProps = {
    waypointsArray: parkProps[],

}

const Waypoints = ({ waypointsArray }: waypointsProps) => {
    return (
        <ul className="waypoints">
            {waypointsArray.map((waypoint) => {
                return (
                    <div className="WaypointbuttonContainer">
                        <button className="WaypointDeleteButton">x</button>
                        <li className="parkWaypoint" key={uuidv4()} >{waypoint.name}</li>
                    </div>
                )
            })}

        </ul>
    )
}

export default Waypoints