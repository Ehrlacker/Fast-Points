
import RightArrow from '../../assets/icons/right-arrow.png'
import './ClosedSelectorForm.css'


type ClosedSelectorFormProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const ClosedSelectorForm = ({ onClick }: ClosedSelectorFormProps) => {
    return (
        <button className="ClosedSelectorForm" onClick={onClick}>
            <img src={RightArrow}></img>
        </button>
    )
}

export default ClosedSelectorForm