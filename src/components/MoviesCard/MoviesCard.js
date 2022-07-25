import './MoviesCard.css'
import imgCard from '../../images/Movies/card-1.jpg'

function MoviesCard() {
    return (
        <>
        <div className="card">
            <img src={imgCard} alt="Постер" className="card__img" />
            <div className="card__group">
                <p className="card__name">33 слова о дизайне</p>
                <p className="card__time">1ч 17м</p>
            </div>
        </div>
        </>
    )
}

export default MoviesCard