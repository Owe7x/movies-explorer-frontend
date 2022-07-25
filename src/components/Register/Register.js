import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo-register.svg'
import './Register.css'
import { FormValidation } from '../../hooks/formValidation';

function Register({onRegister, registerError}) {

    const [btnDisable , setBtnDisable] = useState(true)
    const validForm = FormValidation()

    useEffect(() => {
        validForm.isValid ? setBtnDisable(false) : setBtnDisable(true)
    }, [validForm.isValid])

    function formSubmit (evt) {
        evt.preventDefault();
        onRegister(validForm.values);
        validForm.resetForm()
    }
    return (    
        <>
         <div className='register'>
            <div className='register__container'>
            <Link to='/' className='register__link-logo' target='_self'> 
                <img className='register__image' src={logo} alt='смайл'/>
            </Link> 
                <h2 className='register__title'>Добро пожаловать!</h2>
                <form className='register__form' onSubmit={formSubmit}>
                    <label className='register__label'>Имя
                        <input className={`register__input ${validForm.errors.name && 'register__input-error'}`}
                        type='text' 
                        name='name'
                        id='name' 
                        minLength='2' 
                        maxLength='30'
                        pattern='^[A-Za-zА-Яа-яЁё\s\-]{2,30}$'
                        title='поле может содержать только латиницу, кириллицу, пробел или дефис'
                        value={validForm.values.this}
                        onChange={validForm.handleChange} 
                        required/>
                        <span className='register__error'>{validForm.errors.name}</span>
                    </label>
                    <label className='register__label'>E-mail
                        <input className={`register__input ${validForm.errors.email && 'register__input-error'}`}
                        type='email' 
                        name='email'
                        id='email' 
                        minLength='6' 
                        maxLength='20'
                        pattern='^[^@\s]+@[^@\s]+\.[^@\s]+$'
                        title='поле должно содержать формат электронного адреса' 
                        value={validForm.values.this}
                        onChange={validForm.handleChange} 
                        required/>
                        <span className='register__error'>{validForm.errors.email}</span>
                    </label>
                    <label className='register__label'>Пароль
                        <input className={`register__input ${validForm.errors.password && 'register__input-error'}`}
                        type='password' 
                        name='password'
                        id='password' 
                        minLength='3' 
                        maxLength='20'
                        value={validForm.values.this}
                        onChange={validForm.handleChange}
                        title='поле должно содержать не менее 3 и не более 20 знаков' 
                        required/>
                        <span className='register__error'>{validForm.errors.password}</span>
                    </label>
                    <span className="register__error">{registerError}</span>
                    <button className={`register__button ${btnDisable && 'register__button_disabled'}`}type='submit'>Зарегистрироваться</button>
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