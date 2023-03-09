import './styles.css'

type Props = {
  label: string
}

const ButtonIcon = ({ label }: Props) => {
  return (
    <button id="btn-icon" className="btn btn-primary btn-icon">
      <span>{ label }</span><i className="bi bi-chevron-right"></i>
    </button>
  )
}

export default ButtonIcon;
