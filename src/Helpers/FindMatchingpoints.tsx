
import parkLocations from '../Arrays/parkLocations';

type FindMatchingpointsProps ={
    latLongReversed?: number[][] | null,
    matchingNames:string[] ,
    setMatchingNames: React.Dispatch<React.SetStateAction<string[]> >,
}

const FindMatchingpoints = ({ latLongReversed,matchingNames, setMatchingNames}: FindMatchingpointsProps) => {

    if (latLongReversed) {
        for (const coord1 of latLongReversed) {
            const matchingLocation = parkLocations.find(location => {
                return (
                    location.coordinates[0] === coord1[0] &&
                    location.coordinates[1] === coord1[1]
                );
            });
            if (matchingLocation) {


                setMatchingNames(matchingNames)
            }
        }
    }
}

export default FindMatchingpoints