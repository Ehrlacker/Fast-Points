import { ChangeEventHandler } from 'react';
import CreateRouteButton from '../CreateRouteButton/CreateRouteButton'
import AddWaypointButton from '../AddWaypointButton/AddWaypointButton'
import SelectorFormInput from '../SelectorFormInput/SelectorFormInput'
import { parkProps } from '../../types'
import './SelectorForm.css'
import ViewRouteButton from '../ViewRouteButton/ViewRouteButton';

interface LocationSelectorProps {
  onAddWaypoint: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  viewRoute: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  onOptimizeRoute: () => void,
  start?: parkProps,
  end?: parkProps,
  selectedWaypoint?: parkProps,
  handleStart: ChangeEventHandler<HTMLSelectElement>,
  handleEnd: ChangeEventHandler<HTMLSelectElement>,
  handleSelectedWaypoint: ChangeEventHandler<HTMLSelectElement>,
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

const SelectForm = ({ onAddWaypoint,viewRoute, onOptimizeRoute, start, end, selectedWaypoint, handleStart, handleEnd, handleSelectedWaypoint, onClick }: LocationSelectorProps) => {



  return (
    <div className="SelectorForm">
      <div className="StartEndInputContainer">
        <SelectorFormInput
          selectValue={start?.name || ""}
          inputDefault="Select start"
          onChange={handleStart}
        />

        <SelectorFormInput
          selectValue={end?.name || ""}
          inputDefault="Select end"
          onChange={handleEnd}
        />

      </div>

      <div className="waypointButtonAndInputContainer">
        <SelectorFormInput
          selectValue={selectedWaypoint?.name || ""}
          inputDefault="Select waypoint"
          onChange={handleSelectedWaypoint}
        />

        <AddWaypointButton
          buttonText="Add"
          onClick={onAddWaypoint}
        />

      </div>

      <div className="CreateViewRouteButtonContainer">
        <CreateRouteButton
          buttonText="Create Route"
          onClick={onOptimizeRoute}
        />

        <ViewRouteButton
          buttonText="View Points"
          onClick={viewRoute}
        />
      </div>


      <button className="SelectorFormCloseButton" onClick={onClick}>x</button>


    </div>
  );
}

export default SelectForm;
