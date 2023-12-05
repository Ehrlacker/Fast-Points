
import { parkProps, Trip } from '../../types'
import './ViewRouteContainer.css'
import { Dispatch, SetStateAction } from 'react';
import DirectionsContainer from '../DirectionsContainer/DirectionsContainer';
import OptimizedPointsSection from '../OptimizedPointsSection/OptimizedPointsSection';


type ViewRouteContinerProps = {
    routeStart?: parkProps,
    routePoints: parkProps[],
    routeEnd?: parkProps,
    setState: Dispatch<SetStateAction<parkProps[]>>
    viewRouteFalse: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    PointsModal: boolean,
    setPointsModal: Dispatch<SetStateAction<boolean>>
    OptimizedModal: boolean
    setOptimizedModal: Dispatch<SetStateAction<boolean>>,
    DirectionsModal: boolean
    setDirectionsModal: Dispatch<SetStateAction<boolean>>,
    matchingNames: string[],
    TripArray: Trip[]
    routeViewable: boolean;
}


const ViewRouteContainer = ({
    routeStart,
    routePoints,
    setState,
    routeEnd,
    viewRouteFalse,
    PointsModal,
    setPointsModal,
    OptimizedModal,
    setOptimizedModal,
    DirectionsModal,
    setDirectionsModal,
    matchingNames,
    TripArray,
    routeViewable,
}: ViewRouteContinerProps) => {
    const handlePointsModal = () => {
        setPointsModal(true);
        setOptimizedModal(false);
        setDirectionsModal(false);
    };

    const handleOptimizedModal = () => {
        setOptimizedModal(true);
        setPointsModal(false);
        setDirectionsModal(false);
    };

    const handleDirectionsModal = () => {
        setDirectionsModal(true);
        setPointsModal(false);
        setOptimizedModal(false);
    };

    const handleDeletePoint = (routePoint: parkProps) => {
        const newWayPointList = routePoints.filter((waypoint) => {
            return waypoint.id !== routePoint.id;
        });
        setState(newWayPointList);
    };

    return routeViewable ? (
        <div className="ViewRouteContiner">
            <div className="HeadingsWrapper">
                <button onClick={handlePointsModal} className="ViewRouteContinerPoints">
                    Points
                </button>
                <button
                    onClick={handleOptimizedModal}
                    className="ViewRouteContinerOptimizedPoints"
                >
                    Optimized
                </button>
                <button
                    onClick={handleDirectionsModal}
                    className="ViewRouteContinerDirections"
                >
                    Directions
                </button>
            </div>

            {PointsModal && !OptimizedModal && !DirectionsModal && (
                <div className="RoutePointsContainer">
                    <div className="RouteStart">{routeStart?.name}</div>
                    <div className="WayPointsContainer">
                        {routePoints.map((routePoint) => {
                            return (
                                <div className="WayPointsWrapper" key={routePoint.id}>
                                    <div className="RoutePoints">{routePoint?.name}</div>
                                    <button
                                        className="DeleteWaypoint"
                                        onClick={() => handleDeletePoint(routePoint)}
                                    >
                                        X
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <div className="RouteEnd">{routeEnd?.name}</div>
                </div>
            )}

            {OptimizedModal && !PointsModal && !DirectionsModal && (
                <OptimizedPointsSection matchingNames={matchingNames} />
            )}

            {DirectionsModal && !OptimizedModal && !PointsModal && (
                <DirectionsContainer TripArray={TripArray} />
            )}

            <button className="setViewRouteFalse" onClick={viewRouteFalse}>
                X
            </button>
        </div>
    ) : null; 
};

export default ViewRouteContainer;