import './MoviesCardList.css'
import '../MoviesCard/MoviesCard.css'
import imgCard from '../../images/Movies/card-1.jpg'
import saved from '../../images/saved.svg'
import deleted from '../../images/delete.svg'

function MoviesCardList() {
    let curLocation = window.location.href

    return (
        <>
        <section className='cards'>
            <div className="cards__container">
                <div className="card">
                    <img src={imgCard} alt="Постер" className="card__img" />
                    <div className="card__group">
                        <p className="card__name">33 слова о дизайне</p>
                        <p className="card__time">1ч 17м</p>
                    </div>
                    <button className='card__save'>Сохранить</button>
                </div>
                <div className="card">
                    <img src={imgCard} alt="Постер" className="card__img" />
                    <div className="card__group">
                        <p className="card__name">33 слова о дизайне</p>
                        <p className="card__time">1ч 17м</p>
                    </div>
                    <img className='card__saved' src={saved} alt="" />
                </div>
                <div className="card">
                    <img src={imgCard} alt="Постер" className="card__img" />
                    <div className="card__group">
                        <p className="card__name">33 слова о дизайне</p>
                        <p className="card__time">1ч 17м</p>
                    </div>
                    <img className='card__delete' src={deleted} alt="" />
                </div>
                <div className="card">
                    <img src={imgCard} alt="Постер" className="card__img" />
                    <div className="card__group">
                        <p className="card__name">33 слова о дизайне</p>
                        <p className="card__time">1ч 17м</p>
                    </div>
                </div>
                <div className="card">
                    <img src={imgCard} alt="Постер" className="card__img" />
                    <div className="card__group">
                        <p className="card__name">33 слова о дизайне</p>
                        <p className="card__time">1ч 17м</p>
                    </div>
                </div>
                <div className="card">
                    <img src={imgCard} alt="Постер" className="card__img" />
                    <div className="card__group">
                        <p className="card__name">33 слова о дизайне</p>
                        <p className="card__time">1ч 17м</p>
                    </div>
                </div>
                <div className="card">
                    <img src={imgCard} alt="Постер" className="card__img" />
                    <div className="card__group">
                        <p className="card__name">33 слова о дизайне</p>
                        <p className="card__time">1ч 17м</p>
                    </div>
                </div>
                <div className="card">
                    <img src={imgCard} alt="Постер" className="card__img" />
                    <div className="card__group">
                        <p className="card__name">33 слова о дизайне</p>
                        <p className="card__time">1ч 17м</p>
                    </div>
                </div>
                <div className="card">
                    <img src={imgCard} alt="Постер" className="card__img" />
                    <div className="card__group">
                        <p className="card__name">33 слова о дизайне</p>
                        <p className="card__time">1ч 17м</p>
                    </div>
                </div>
            </div>
            { curLocation === 'http://localhost:3000/saved-movies' ? ''
                : <button  className='cards__button cards__hover'>Ещё</button>
                }




            
            
        </section>
        </>
    )
}

export default MoviesCardList