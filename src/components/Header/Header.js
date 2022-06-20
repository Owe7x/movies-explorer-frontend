import { Link, useLocation } from 'react-router-dom'; 
import logo from '../../images/logo.svg'
import './Header.css'
import Navigation from '../Navigation/Navigation'


function Header({loggedIn}) {
    const routes  = useLocation(); 

    return (
        <>
            <header className={`${!loggedIn || routes.pathname === '/' ? 'header' : 'header-white'}`} >
                <div className="header__container">
                    <Link to='/'>
                        <img src={logo} alt="Логотип" />
                    </Link>
        
                {loggedIn ? (
                    <Navigation/>
                ) : (
                    <nav className="header__nav">
                        <Link to='/signup' className='header__signin header__hover'>Регистрация</Link>
                        <Link to='/signin' className='header__signup header__hover'>Войти</Link>
                    </nav>
                )}
                </div>
            </header>
        </>
    ) 
}

export default Header