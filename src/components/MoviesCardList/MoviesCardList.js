import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Footer from '../Footer/Footer'

function MoviesCardList() {
    return (
        <>
        <section className='cards'>
            <div className="cards__container">
                <MoviesCard></MoviesCard>
                <MoviesCard></MoviesCard>
                <MoviesCard></MoviesCard>
                <MoviesCard></MoviesCard>
                <MoviesCard></MoviesCard>
                <MoviesCard></MoviesCard>
            </div>
            <button  className='cards__button cards__hover'>Ещё</button>
            <Footer></Footer>
        </section>
        </>
    )
}

export default MoviesCardList