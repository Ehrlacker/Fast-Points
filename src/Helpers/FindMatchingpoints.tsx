
import parkLocations from '../Arrays/parkLocations';

const findMatchingLocations = (latLongReversed: number[][]) => {
    const matchingNames = []
    if (latLongReversed) {
        for (const coord1 of latLongReversed) {
            const matchingLocation = parkLocations.find(location => {
                return (
                    location.coordinates[0] === coord1[0] &&
                    location.coordinates[1] === coord1[1]
                );
            });

            if (matchingLocation) {
                matchingNames.push(matchingLocation.name);
            }
        }

    }
    return matchingNames;
}

export default findMatchingLocations