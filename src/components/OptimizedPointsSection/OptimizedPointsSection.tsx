import { v4 as uuidv4 } from 'uuid'
import './OptimizedpointsSection.css'

type OptimizedPointsSectionProps = {
    matchingNames: string[],
}

const OptimizedPointsSection = ({ matchingNames }: OptimizedPointsSectionProps) => {
    return (
        <div className="OptimizedRoutePointsContainer">
            <div className="OptimizedWayPointsContainer">
                {matchingNames.map((name) => {
                    return (

                        <div className="OptimizedPointsWrapper" key={uuidv4()}>
                            <div className="OptimizedRoutePoints">{name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default OptimizedPointsSection