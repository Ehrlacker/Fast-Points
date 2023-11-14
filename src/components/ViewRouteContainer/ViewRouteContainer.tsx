
import { parkProps } from '../../types'
import './ViewRouteContainer.css'
import { Dispatch, SetStateAction } from 'react';


type ViewRouteContinerProps = {
    routeStart?: parkProps,
    routePoints: parkProps[],
    routeEnd?: parkProps,
    setState: Dispatch<SetStateAction<parkProps[]>>
    viewRouteFalse: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}


const ViewRouteContainer = ({ routeStart, routePoints, setState, routeEnd, viewRouteFalse }: ViewRouteContinerProps) => {

    const handleDeletePoint = (routePoint: parkProps) => {
        const newWayPointList = routePoints.filter(waypoint => {
            return waypoint.id !== routePoint.id
        })
        setState(newWayPointList)
    }


    return (
        <div className="ViewRouteContiner">
            <div className="RoutePointsContainer">
                <div className="RouteStart">{routeStart?.name}</div>
                <div className="WayPointsContainer">
                    {routePoints.map((routePoint) => {
                        return (
                            <div className="WayPointsWrapper" key={routePoint.id}>
                                <div className="RoutePoints">{routePoint?.name}</div>
                                <button className="DeleteWaypoint"
                                    onClick={() => handleDeletePoint(routePoint)}>X</button>
                            </div>
                        )
                    })}
                </div>
                <div className="RouteEnd">{routeEnd?.name}</div>
            </div>
            <button className="setViewRouteFalse" onClick={viewRouteFalse}>X</button>
        </div>
    )
}

export default ViewRouteContainer