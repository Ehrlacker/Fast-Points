import { ChangeEventHandler } from 'react';
import SelectorFormButton from '../SelectorFormButton/SelectorFormButton';
import SelectorFormInput from '../SelectorFormInput/SelectorFormInput'
import {parkProps} from '../../types'
import { v4 as uuidv4 } from 'uuid';
import './SelectorForm.css'

interface LocationSelectorProps {
  onAddWaypoint: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onOptimizeRoute: () => void;
  waypoints: parkProps[];
  start?: parkProps,
  end?: parkProps,
  selectedWaypoint?: parkProps,
  handleStart:ChangeEventHandler<HTMLSelectElement>,
  handleEnd:ChangeEventHandler<HTMLSelectElement>
  handleSelectedWaypoint: ChangeEventHandler<HTMLSelectElement>,
}

const SelectForm = ({ onAddWaypoint, onOptimizeRoute, waypoints, start, end, selectedWaypoint, handleStart, handleEnd, handleSelectedWaypoint }: LocationSelectorProps) => {



  return (
    <div className="SelectorForm">
      <SelectorFormInput
        selectValue={start?.name || ""}
        inputDefault="Select starting location"
        // onChange={(e) => setStart(e.target.value)}
        onChange={handleStart}
      />

      <SelectorFormInput
        selectValue={end?.name || ""}
        inputDefault="Select ending location"
        // onChange={(e) => setEnd(e.target.value)}
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
      <ul>
        {waypoints.map((waypoint) => {
          return <li key={uuidv4()} >{waypoint.name}</li>
        })}

      </ul>
      <SelectorFormButton
        buttonText="Create Route"
        onClick={onOptimizeRoute}
      />
    </div>
  );
}

export default SelectForm;
