import s from './Header.module.scss'

function Header() {
  return (
    <header className={s.header}>
        <div>
            <h1>Add notes</h1>
            <p>Add your notes, edit and delete</p>
        </div>
    </header>
  )
}

export default Header;
