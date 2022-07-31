import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

function Movies({ findSaveMovies, findMovies,  isChangeBox , isChangeBoxSave,  moviesCollection, isLoadingMovies, searchError, searchServerError, changeCheckBox,  saveMovieCollection, saveMovieInCollection, deleteMovieInCollection}) {
    

    return (
        <>  
            <SearchForm
                findMovies={findMovies}
                changeCheckBox={changeCheckBox}
                isChangeBox={isChangeBox}
                isChangeBoxSave={isChangeBoxSave}
                isSave={false}
                findSaveMovies={findSaveMovies}
            ></SearchForm>
            <MoviesCardList
                moviesCollection={moviesCollection}
                isLoadingMovies={isLoadingMovies}
                searchError={searchError}
                searchServerError={searchServerError}
                isSave={false}
                saveMovieCollection={saveMovieCollection}
                saveMovieInCollection={saveMovieInCollection}
                deleteMovieInCollection={deleteMovieInCollection}
                
            ></MoviesCardList>
        </>
    )
}

export default Movies