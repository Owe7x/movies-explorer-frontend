import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo-register.svg'
import './Register.css'

function Register() {
    return (
        <>
         <div className='register'>
            <div className='register__container'>
            <Link to='/' className='register__link-logo' target='_self'> 
                <img className='register__image' src={logo} alt='смайл'/>
            </Link> 
                <h2 className='register__title'>Добро пожаловать!</h2>
                <form className='register__form'>
                    <label className='register__label'>Имя
                        <input className='register__input'
                        type='text' 
                        name='name'
                        id='name' 
                        minLength='2' 
                        maxLength='30'
                        pattern='^[A-Za-zА-Яа-яЁё\s\-]{2,30}$'
                        title='поле может содержать только латиницу, кириллицу, пробел или дефис'
                        required/>
                        <span className='register__input-error'></span>
                    </label>
                    <label className='register__label'>E-mail
                        <input className='register__input'
                        type='email' 
                        name='email'
                        id='email' 
                        minLength='6' 
                        maxLength='20'
                        pattern='^[^@\s]+@[^@\s]+\.[^@\s]+$'
                        title='поле должно содержать формат электронного адреса' 
                        required/>
                        <span className='register__input-error'></span>
                    </label>
                    <label className='register__label'>Пароль
                        <input className='register__input' 
                        type='password' 
                        name='password'
                        id='password' 
                        minLength='3' 
                        maxLength='20'
                        title='поле должно содержать не менее 3 и не более 20 знаков' 
                        required/>
                        <span className='register__input-error'></span>
                    </label>
                    <button className='register__button' type='submit'>Зарегистрироваться</button>
                </form>
                <div className='register__box'>
                    <p className='register__text' >Уже зарегистрированы?</p>
                    <Link className='register__link' to='/signin'>Войти</Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Register