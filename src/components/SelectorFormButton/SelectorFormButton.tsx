
import './SelectorFormButton.css'

type SelectorFormButtonProps={
  buttonText: string
onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const SelectorFormButton = ({onClick, buttonText}:SelectorFormButtonProps) => {
  return (
    <button onClick={onClick} className="SelectorFormButton">{buttonText}</button>
  )
}

export default SelectorFormButton