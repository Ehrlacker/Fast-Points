import { parkProps } from "../../types"
import { v4 as uuidv4 } from 'uuid';


type waypointsProps={
    waypointsArray: parkProps[],

}

const Waypoints = ({waypointsArray}:waypointsProps) => {
  return (
    <ul>
    {waypointsArray.map((waypoint) => {
      return <li className="parkWaypoint" key={uuidv4()} >{waypoint.name}</li>
    })}

  </ul>
  )
}

export default Waypoints