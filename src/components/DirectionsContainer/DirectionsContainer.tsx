import { Trip } from "../../types"
import { v4 as uuidv4 } from 'uuid';
import './DirectionsContainer.css'


type DirectionsContainerProps = {
    TripArray: Trip[]
}


const DirectionsContainer = ({ TripArray }: DirectionsContainerProps) => {
    return (
        <div className="Trips">
            {TripArray?.map((trip) =>
                trip.legs.map((leg) =>
                    leg.steps.map((step) => (
                        <ul key={uuidv4()}>
                            <li>{step.maneuver.instruction}</li>
                        </ul>
                    ))
                )
            )}
        </div>
    )
}

export default DirectionsContainer;


