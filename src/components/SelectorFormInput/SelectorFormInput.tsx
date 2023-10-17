
import { ChangeEventHandler } from 'react'
import parkLocations from '../../Arrays/parkLocations'
import { v4 as uuidv4 } from 'uuid';
import './SelectorFormInput.css'

type SelectorFormInputProps={
    inputDefault:string;
    onChange: ChangeEventHandler
}

const SelectorFormInput = ({inputDefault, onChange}:SelectorFormInputProps) => {
  return (
    <select className="SelectorFormInput" onChange={onChange} value={inputDefault} >
            <option disabled={true} value={inputDefault}>{inputDefault}</option>
            {parkLocations?.map((park) => {
              
                return (
                    <option key={uuidv4()}>
                        {park.name}
                    </option>
                )
            })}
    </select>
  )
}

export default SelectorFormInput