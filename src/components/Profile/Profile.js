import './Profile.css'
import React from 'react';
import {  useEffect } from 'react';
import { CurrentUser } from '../../context/CurrentUserContext';
import { FormValidation } from '../../hooks/formValidation';

function Profile({changeUserInfo, logOut}) {

    const currentUser = React.useContext(CurrentUser);


    const { values, handleChange, errors, isValid, resetForm, setValues } = FormValidation();


    function handleChangeInput(e) {
        handleChange(e)     
    }

    useEffect(() => {
        setValues(currentUser.user);

    }, [currentUser, setValues]) ;

    function formSubmit (evt) {
        evt.preventDefault();
        changeUserInfo({ email: values.email, name: values.name });
        resetForm()
    }
    function logOutProfile() {
        resetForm()
        logOut()
    }
    return (
        <>
        <section className='profile'>
            <div className="profile__container">
                <h2 className="profile__title">
                Привет, {currentUser.user.name}!
                </h2>
                <form className='profile__form' onSubmit={formSubmit}>
                        <label className='profile__label'>Имя
                            <input className={`profile__input ${errors.name && 'register__input-error'}`}
                            type='text' 
                            name='name'
                            id='name'
                            formNoValidate
                            minLength='2' 
                            maxLength='30'
                            pattern='^[A-Za-zА-Яа-яЁё\s\-]{2,30}$'
                            onChange={handleChangeInput}
                            value={values.name || ""}
                            required/>
                        </label>
                        <span className='login__input-error'>{errors.email}</span>
                        <div className='profile__line'></div>
                        <label className='profile__label'>E-mail
                            <input className={`profile__input ${errors.email && 'register__input-error'}`}
                            type='email' 
                            name='email'
                            id='email'
                            formNoValidate 
                            minLength='6' 
                            maxLength='20'
                            pattern='^[^@\s]+@[^@\s]+\.[^@\s]+$'
                            onChange={handleChangeInput}
                            value={values.email || ""}
                            required/>
                        </label>
                        <span className='login__input-error'>{errors.email}</span>
                        <span className='profile__input-error'></span>

                        <div className='profile__buttons'>
                            <button className={`profile__button  profile__button--profile ${!isValid && 'profile__button_disabled'}`} disabled={!isValid} type='submit'>Редактировать</button>
                            <button onClick={logOutProfile} className='profile__button profile__button-red profile__hover' type='button'>Выйти из аккаунта</button>
                        </div>
                </form>
            </div>
        </section>
        </>
    )
}

export default Profile