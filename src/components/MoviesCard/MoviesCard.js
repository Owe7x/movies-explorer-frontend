
import './MoviesCard.css'


function MoviesCard({ movies, isSave ,  saveMovieInCollection, deleteMovieInCollection, saveMovieCollection}) {


    function isLike() {
        return saveMovieCollection.some((item) =>  item.movieId === movies.id);
    }


    const moviesDuration = `${Math.floor(movies.duration / 60)}ч ${movies.duration % 60}м`;

    function onSaveFilm () {
        saveMovieInCollection(movies);
    }
    function onDeleteFilm () {
        deleteMovieInCollection(movies)
    }
    return (
        <>
        <div className="card">
            <a className='card__link' href={movies.trailerLink} target="_blank" rel="noopener noreferrer">
                {
                    isSave  ? 
                    <img src={movies.image} alt="Постер" className="card__img" />
                    :
                    <img src={`https://api.nomoreparties.co${movies.image.url}`} alt="Постер" className="card__img" />
                }
                
                <div className="card__group">
                    <p className="card__name">{movies.nameRU}</p>
                    <p className="card__time">{moviesDuration}</p>
                </div>

                
            </a>
            { 
                    isSave ? (
                    <button 
                    className='card__delete' 
                    onClick={onDeleteFilm}
                    aria-label='удаление фильма'
                    ></button>
                ) :
                (
                    <button
                    onClick={isLike() ?  onDeleteFilm : onSaveFilm} 
                    className={`card__save ${
                        isLike() && `card__saved`}`}
                    aria-label='добавление фильма'
                    >{isLike() ? '' : 'Сохранить' }</button> 
                )
            }
        </div>
        </>
    )
}

export default MoviesCard