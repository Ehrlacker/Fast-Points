
import { ChangeEventHandler } from 'react'
import parkLocations from '../../Arrays/parkLocations'
import { v4 as uuidv4 } from 'uuid';
import './SelectorFormInput.css'

type SelectorFormInputProps={
  selectValue:string;
  inputDefault:string
    onChange: ChangeEventHandler<HTMLSelectElement>
}

const SelectorFormInput = ({selectValue, inputDefault, onChange}:SelectorFormInputProps) => {
  return (
    <select className="SelectorFormInput" value={selectValue} onChange={onChange}>
    <option value="" disabled>{inputDefault}</option>
    {parkLocations.map(park => <option  key={uuidv4()} value={park.name}>{park.name}</option>)}
</select>
  )
}

export default SelectorFormInput