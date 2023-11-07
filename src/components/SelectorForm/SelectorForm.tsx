import { ChangeEventHandler } from 'react';
import CreateRouteButton from '../CreateRouteButton/CreateRouteButton'
import AddWaypointButton from '../AddWaypointButton/AddWaypointButton'
import SelectorFormInput from '../SelectorFormInput/SelectorFormInput'
import { parkProps } from '../../types'
import './SelectorForm.css'
// import Waypoints from '../Waypoints/Waypoints';
import ViewRouteButton from '../ViewRouteButton/ViewRouteButton';

interface LocationSelectorProps {
  onAddWaypoint: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onOptimizeRoute: () => void;
  // waypoints: parkProps[];
  start?: parkProps,
  end?: parkProps,
  selectedWaypoint?: parkProps,
  handleStart: ChangeEventHandler<HTMLSelectElement>,
  handleEnd: ChangeEventHandler<HTMLSelectElement>
  handleSelectedWaypoint: ChangeEventHandler<HTMLSelectElement>,
}

const SelectForm = ({ onAddWaypoint, onOptimizeRoute, start, end, selectedWaypoint, handleStart, handleEnd, handleSelectedWaypoint }: LocationSelectorProps) => {



  return (
    <div className="SelectorForm">
      <div className="StartEndInputContainer">
        <SelectorFormInput
          selectValue={start?.name || ""}
          inputDefault="Select starting location"
          onChange={handleStart}
        />

        <SelectorFormInput
          selectValue={end?.name || ""}
          inputDefault="Select ending location"
          onChange={handleEnd}
        />

      </div>

      <div className="waypointButtonAndInputContainer">
        <SelectorFormInput
          selectValue={selectedWaypoint?.name || ""}
          inputDefault="Select a waypoint"
          onChange={handleSelectedWaypoint}
        />

        <AddWaypointButton
          buttonText="Add Waypoint"
          onClick={onAddWaypoint}
        />

      </div>

      {/* <Waypoints waypointsArray={waypoints} /> */}
      <div className="CreateViewRouteButtonContainer">
        <CreateRouteButton
          buttonText="Create Route"
          onClick={onOptimizeRoute}
        />

        <ViewRouteButton
          buttonText="View Route"
          onClick={() => { "logged" }}
        />
      </div>


    </div>
  );
}

export default SelectForm;
