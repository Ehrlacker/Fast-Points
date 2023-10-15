
import SelectorFormButton from '../SelectorFormButton/SelectorFormButton'
import SelectorFormInput from '../SelectorFormInput/SelectorFormInput'
import './SelectorForm.css'

const SelectorForm = () => {
  return (
    <form className="SelectorForm">
        <SelectorFormInput />
        <SelectorFormInput />
        <SelectorFormInput />
        <SelectorFormButton />
    </form>
  )
}

export default SelectorForm