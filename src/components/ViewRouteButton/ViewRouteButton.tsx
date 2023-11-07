import './ViewRouteButton.css'

type ViewRouteButtonProps={
    buttonText: string
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  }
  
  const ViewRouteButton = ({onClick, buttonText}:ViewRouteButtonProps) => {
    return (
      <button onClick={onClick} className="ViewRouteButton">{buttonText}</button>
    )
  }
  
  export default ViewRouteButton