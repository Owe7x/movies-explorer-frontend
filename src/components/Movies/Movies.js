import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

function Movies() {
    return (
        <>
            <SearchForm></SearchForm>
            <MoviesCardList></MoviesCardList>
        </>
    )
}

export default Movies