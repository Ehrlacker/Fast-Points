
import { ChangeEventHandler } from 'react'
import SelectorFormButton from '../SelectorFormButton/SelectorFormButton'
import SelectorFormInput from '../SelectorFormInput/SelectorFormInput'
import './SelectorForm.css'


type SelectorFormProps={
onChange:ChangeEventHandler
}



const SelectorForm = ({onChange}:SelectorFormProps) => {
  return (
    <form className="SelectorForm">
        <SelectorFormInput
        inputDefault="Starting point"
        onChange={onChange}
        />
        <SelectorFormInput
        inputDefault= "Middle point"
        onChange={onChange}
        />
        <SelectorFormInput 
        inputDefault= "End point"
        onChange={onChange}
        />
        <SelectorFormButton
        />
    </form>
  )
}

export default SelectorForm