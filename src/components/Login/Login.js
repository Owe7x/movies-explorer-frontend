import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo-register.svg'
import './Login.css'

function Login() {
    return (
        <>
        <section className='login'>
            <div className='login__container'>
            <Link to='/' className='login__link-logo' target='_self'>
                <img className='login__image' src={logo} alt='смайл'/>
            </Link>
                <h2 className='login__title'>Рады видеть!</h2>
                <form className='login__form'>
                    <label className='login__label'>E-mail
                        <input className='login__input'
                        type='email' 
                        name='email'
                        id="email" 
                        minLength='6' 
                        maxLength='20'
                        pattern='^[^@\s]+@[^@\s]+\.[^@\s]+$' 
                        required
                        title='поле должно содержать формат электронного адреса'  
                        />
                        <span className='login__input-error'></span>
                    </label>
                    <label className='login__label'>Пароль
                        <input className='login__input'
                        type='password' 
                        name='password'
                        id='password'
                        minLength='6' 
                        maxLength='20' 
                        required
                        title='поле должно содержать не менее 6 и не более 20 знаков'  
                        />
                        <span className='login__input-error'></span>
                    </label>
                    <button className='register__button' type="submit">Войти</button>
                </form>
                <div className='login__box'>
                    <p className='login__text'>Ещё не зарегистрированы?</p>
                    <Link to='/signup' className='login__link' target='_self'>Регистрация</Link>
                </div>
            </div>
        </section>
        </>
    )
}

export default Login