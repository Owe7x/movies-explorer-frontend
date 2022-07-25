import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo-register.svg'
import './Login.css'
import { FormValidation } from '../../hooks/formValidation';

function Login({onLogin}) {

    const [btnDisable , setBtnDisable] = useState(true)
    const validForm = FormValidation()

    useEffect(() => {
        validForm.isValid ? setBtnDisable(false) : setBtnDisable(true)
    }, [validForm.isValid])

    function formSubmit (evt) {
        evt.preventDefault();
        onLogin(validForm.values);
        validForm.resetForm()
    }

    return (
        <>
        <section className='login'>
            <div className='login__container'>
            <Link to='/' className='login__link-logo' target='_self'>
                <img className='login__image' src={logo} alt='смайл'/>
            </Link>
                <h2 className='login__title'>Рады видеть!</h2>
                <form className='login__form' onSubmit={formSubmit}>
                    <label className='login__label'>E-mail
                        <input className={`login__input ${validForm.errors.email && 'login__input-error'}`}
                        type='email' 
                        name='email'
                        id="email" 
                        minLength='6' 
                        maxLength='20'
                        pattern='^[^@\s]+@[^@\s]+\.[^@\s]+$' 
                        required
                        title='поле должно содержать формат электронного адреса'  
                        value={validForm.values.this}
                        onChange={validForm.handleChange}
                        />
                        <span className='login__input-error'>{validForm.errors.email}</span>
                    </label>
                    <label className='login__label'>Пароль
                        <input className={`login__input ${validForm.errors.password && 'login__input-error'}`}
                        type='password' 
                        name='password'
                        id='password'
                        minLength='6' 
                        maxLength='20' 
                        required
                        title='поле должно содержать не менее 6 и не более 20 знаков'  
                        value={validForm.values.this}
                        onChange={validForm.handleChange}
                        />
                        <span className='login__input-error'>{validForm.errors.password}</span>
                    </label>
                    <button className={`register__button ${btnDisable && 'register__button_disabled'}`} type="submit">Войти</button>
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