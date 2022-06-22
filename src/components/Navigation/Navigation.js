import './Navigation.css'
import { Link } from 'react-router-dom'
import iconHuman from '../../images/icon-human.svg'

function Navigation() {
    return (
        <>
            <div className="navigation__group">
                <Link to='/movies' className='navigation__link navigation__link-activ' target=''>Фильмы </Link>
                <Link to='/saved-movies' className='navigation__link' target=''>Сохранённые фильмы</Link>
            </div>
            <Link to='/profile' className='navigation__link navigation__profile' target=''>
                <img src={iconHuman} alt="Аккаунт" />
                Аккаунт
            </Link>
            <input className="checkbox" type="checkbox" name="" id="" />
            <div className="hamburger-lines">
                <span className="line line1"></span>
                <span className="line line2"></span>
                <span className="line line3"></span>
            </div>
            <div className="menu-items">
                <div className="menu-items__container">
                <div className="navigation__group navigation__group--mobile">
                    <Link to='/' className='navigation__link navigation__link--mobile'>Главная</Link>
                    <Link to='/movies' className='navigation__link navigation__link-activ navigation__link--mobile' target=''>Фильмы </Link>
                    <Link to='/saved-movies' className='navigation__link navigation__link--mobile' target=''>Сохранённые фильмы</Link>
                </div>
                <Link to='/profile' className='navigation__link navigation__profile navigation__profile--mobile' target=''>
                    <img src={iconHuman} alt="Аккаунт" />
                    Аккаунт
                </Link>
                </div>

          </div>
        </>
    )
}

export default Navigation 