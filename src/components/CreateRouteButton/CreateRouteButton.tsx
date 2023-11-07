
import './CreateRouteButton.css'

type CreateRouteButtonProps={
    buttonText: string
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  }
  
  const CreateRouteButton = ({onClick, buttonText}:CreateRouteButtonProps) => {
    return (
      <button onClick={onClick} className="CreateRouteButton">{buttonText}</button>
    )
  }
  
  export default CreateRouteButton