import './Profile.css'

function Profile() {
    return (
        <>
        <section className='profile'>
            <div className="profile__container">
                <h2 className="profile__title">
                Привет, Виталий!
                </h2>
                <form className='profile__form' >
                        <label className='profile__label'>Имя
                            <input className='profile__input'
                            type='text' 
                            name='name'
                            id='name'
                            formNoValidate
                            minLength='2' 
                            maxLength='30'
                            pattern='^[A-Za-zА-Яа-яЁё\s\-]{2,30}$'
                            required/>
                        </label>
                        <div className='profile__line'></div>
                        <label className='profile__label'>E-mail
                            <input className='profile__input '
                            type='email' 
                            name='email'
                            id='email'
                            formNoValidate 
                            minLength='6' 
                            maxLength='20'
                            pattern='^[^@\s]+@[^@\s]+\.[^@\s]+$'
                            required/>
                        </label>
                        <span className='profile__input-error'></span>

                        <div className='profile__buttons'>
                            <button className='profile__button' type='submit'>Редактировать</button>
                            <button className='profile__button profile__button-red profile__hover' type='button'>Выйти из аккаунта</button>
                        </div>
                </form>
            </div>
        </section>
        </>
    )
}

export default Profile