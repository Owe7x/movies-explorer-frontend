import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css'
import '../MoviesCard/MoviesCard.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'

function MoviesCardList({moviesCollection, isLoadingMovies, searchError, searchServerError, isSave, saveMovieCollection, saveMovieInCollection, deleteMovieInCollection}) {

    const pathname = useLocation();

    const [moviesInWindow, setMoviesInWindow] = useState(() => {
    
    const windowWidth = window.innerWidth;
        if (windowWidth >= 1280) {
            return 12
        } else if (windowWidth >= 768) {
            return 8
        } else return 5
    })

    const [addMovies, setAddMovies] = useState(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth > 1280) {
            return 3
        } else return 2
    })

    function resizeWindowWidth() {
        const windowWidth = window.innerWidth;
        if (windowWidth > 1280) {
            setMoviesInWindow(12);
            setAddMovies(3);
        } else if (windowWidth >= 768) {
            setMoviesInWindow(8);
            setAddMovies(2);
        } else {
            setMoviesInWindow(5);
            setAddMovies(2);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', resizeWindowWidth);
    }, []);

    const moviesVisible = moviesCollection ? moviesCollection.slice(0, moviesInWindow) : moviesCollection;
    
    function addMoviesInCollectionVisible() {
        setMoviesInWindow(prevState => prevState + addMovies);
    }
 
    return (
        <>
        <section className='cards'>
        <Preloader isLoadingMovies={isLoadingMovies} />
        <p className="cards__form__error">{searchError ? "Ничего не найдено" : ""}</p>
        <p className="cards__form__error">{searchServerError ? "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз" : ""}</p>
            <div className={isLoadingMovies ? 'cards__container-none' : 'cards__container'} >
                {
                    pathname.pathname === '/movies' ?
                    moviesVisible.map((movies, index) => { 
                        return (<MoviesCard key={index} movies={movies} isSave={isSave} saveMovieCollection={saveMovieCollection} saveMovieInCollection={saveMovieInCollection}  deleteMovieInCollection={deleteMovieInCollection}/>)
                    })
                    :
                    moviesVisible.map((movies, index) => { 
                        return (<MoviesCard key={index} movies={movies} isSave={isSave} saveMovieCollection={saveMovieCollection} saveMovieInCollection={saveMovieInCollection}  deleteMovieInCollection={deleteMovieInCollection}/>)
                    })
                }

            </div>

            { pathname.pathname === "/saved-movies" ? ''
                : <button onClick={addMoviesInCollectionVisible}  className={moviesVisible.length === moviesCollection.length ? "cards__button-hide" : "cards__button cards__hover"}>Ещё</button>
                }




            
            
        </section>
        </>
    )
}

export default MoviesCardList