import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

function SavedMovies({ findSaveMovies, findMovies,  isChangeBox , isChangeBoxSave, moviesCollection, isLoadingMovies, searchError, searchServerError, changeCheckBox, saveMovieCollection, saveMovieInCollection, deleteMovieInCollection }) {

    console.log(moviesCollection);

    return (
        <>
            <SearchForm
                findMovies={findMovies}
                changeCheckBox={changeCheckBox}
                isChangeBox={isChangeBox}
                isChangeBoxSave={isChangeBoxSave}
                isSave={true}
                findSaveMovies={findSaveMovies}
            ></SearchForm>
            <MoviesCardList
                moviesCollection={moviesCollection}
                isLoadingMovies={isLoadingMovies}
                searchError={searchError}
                searchServerError={searchServerError}
                isSave={true}
                saveMovieCollection={saveMovieCollection}
                saveMovieInCollection={saveMovieInCollection}
                deleteMovieInCollection={deleteMovieInCollection}
            ></MoviesCardList>
        </>
    )
}

export default SavedMovies 