import s from './Modal.module.scss'

interface IProps {
    active: boolean, 
    setActive: (active: boolean) => void,
    children: JSX.Element,
}

function Modal({active, setActive, children}: IProps) {
  return (
    <div className={active ? (s.modal + ' ' + s.active) : s.modal} onClick={() => setActive(false)}>
        <div className={active ? (s.modalContent + ' ' + s.active) : s.modalContent} onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    </div>
  )
}

export default Modal