
import './AddWaypointButton.css'

type AddWaypointButtonProps={
  buttonText: string
onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const AddWaypointButton = ({onClick, buttonText}:AddWaypointButtonProps) => {
  return (
    <button onClick={onClick} className="AddWaypointButton">{buttonText}</button>
  )
}

export default AddWaypointButton