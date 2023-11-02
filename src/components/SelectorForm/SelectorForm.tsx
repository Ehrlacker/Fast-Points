import { ChangeEventHandler } from 'react';
import SelectorFormButton from '../SelectorFormButton/SelectorFormButton';
import SelectorFormInput from '../SelectorFormInput/SelectorFormInput'
import { parkProps } from '../../types'
import './SelectorForm.css'
import Waypoints from '../Waypoints/Waypoints';

interface LocationSelectorProps {
  onAddWaypoint: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onOptimizeRoute: () => void;
  waypoints: parkProps[];
  start?: parkProps,
  end?: parkProps,
  selectedWaypoint?: parkProps,
  handleStart: ChangeEventHandler<HTMLSelectElement>,
  handleEnd: ChangeEventHandler<HTMLSelectElement>
  handleSelectedWaypoint: ChangeEventHandler<HTMLSelectElement>,
}

const SelectForm = ({ onAddWaypoint, onOptimizeRoute, waypoints, start, end, selectedWaypoint, handleStart, handleEnd, handleSelectedWaypoint }: LocationSelectorProps) => {



  return (
    <div className="SelectorForm">
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

      <SelectorFormInput
        selectValue={selectedWaypoint?.name || ""}
        inputDefault="Select a waypoint"
        onChange={handleSelectedWaypoint}
      />


      <SelectorFormButton
        buttonText="Add Waypoint"
        onClick={onAddWaypoint}
      />

      <Waypoints waypointsArray={waypoints} />

      <SelectorFormButton
        buttonText="Create Route"
        onClick={onOptimizeRoute}
      />
    </div>
  );
}

export default SelectForm;
