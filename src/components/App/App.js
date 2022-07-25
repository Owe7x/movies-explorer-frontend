import './App.css';
import React, { useState, useEffect } from 'react';
import {  Route, Switch, useHistory, useLocation } from 'react-router-dom'
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main'
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile'
import Register from '../Register/Register'
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';
import  MoviesApi from "../../utils/MoviesApi";
import  {register, login, getSaveMovies, getUserInfo, changeProfile , setSaveMovie, deleteSaveMovie} from "../../utils/MainApi";
import { CurrentUser } from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  /* Авторизован или нет */
  const [loggedIn, setLoggedIn] = useState(false);
  /* Toggle короткометражек */
  const [isChangeBox, setIsChangeBox] = useState(true);
  /* Отфильтрованные фильмы */
  const [filterMoviesCollection, setFilterMoviesCollection] = useState([]);
  /* Отфильтрованные фильмы по времени */
  const [filterTimeMoviesCollection , setFilterTimeMoviesCollection ] = useState([]);
  /* Сохраненные фильмы отсортированные по времени */
  const [filterTimeMoviesSaveCollection , setFilterTimeMoviesSaveCollection ] = useState([]);
    /* Сохраненные фильмы */
    const [saveMovieCollection, setSaveMovieCollection] = useState([]);
  /* Пока сам не понимаю  */
  const [moviesCollection, setMoviesCollection] = useState([]);
  /* Прелоадер загрузки фильмов */
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  /* Ошибка поиска фильма */
  const [searchError, setSearchError] = useState(false);
  /* Ошибка сервера поиска фильмов */
  const [searchServerError, setSearchServerError] = useState(false);
  /* Ошибка регистрации */
  const [registerError , setRegisterError] = useState('')

  /* Данные о пользователе */
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));

  /* Переход по страницам*/
  const history = useHistory();
  const pathname = useLocation();
  /* Достаем из localStorate состояние checkbox */
  let getCheckBox = JSON.parse(localStorage.getItem('isChangeBox'))

  /* Проверка пользователя по токену */

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    const movies = localStorage.getItem('movies');
    const savedMovies = localStorage.getItem('savedMovies');
      if (jwt) {
        setLoggedIn(true);
        if (savedMovies) {
          const resultSave = JSON.parse(savedMovies);
          setSaveMovieCollection(resultSave);
        }
        if (movies) {
          console.log(movies);
          const result = JSON.parse(movies);
          setMoviesCollection(result);
        }
        getUserInfo(jwt)
          .then((userInfo) => {
            setCurrentUser(userInfo);
            localStorage.setItem('currentUser', JSON.stringify(userInfo)) 
            history.push(pathname.pathname);
          })
          .catch((err) => {
                history.push('/signin');
                console.log(`Внимание! ${err}`);
          })
        
      }  
      
     // eslint-disable-next-line react-hooks/exhaustive-deps           
  }, []);

  /* Авторизация пользователя */

  function onLogin({ email, password}) {
    console.log(email, password);
    login({email , password})
      .then((data) => {
        console.log(data);
        if(data.token) {

          localStorage.setItem('jwt', data.token);
          setLoggedIn(true)
          history.push('/movies');
          getSaveMovies(data.token)
            .then((data) => {
              setSaveMovieCollection(data)
              localStorage.setItem('savedMovies', JSON.stringify(data));
              console.log(data);
            })
          getUserInfo(data.token)
            .then((data) => {
              console.log(data);
              setCurrentUser(data);
              localStorage.setItem('currentUser', JSON.stringify(data)) 
            })
            .catch((err) => {
                console.log(err);
            })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  /* Регистрация пользователя */

  function onRegister({ name, email, password }) {
    register({ name, password, email })
      .then((data) => {
            if (data) {
              
              onLogin({ email, password })
              
            }
      })
      .catch((err) => {
        setRegisterError('Что-то пошло не так! Попробуйте ещё раз.');
    })
  }

  /* Получение всех фильмов */
  function findMovies(searchText) {
    setIsLoadingMovies(true);
    setSearchError(false);
    setSearchServerError(false)
      if(searchText) {
        MoviesApi.getMoives()
          .then((res) => {
            setMoviesCollection(res);
            const result = searchMovies(res, searchText);
            localStorage.setItem('movies', JSON.stringify(result));
            if (result.length > 0) {
              setSearchError(false);
            } 
            else {
              setSearchError(true);
            }
            setFilterMoviesCollection(result)
            setIsLoadingMovies(false);

            if (isChangeBox) {
              const resultTimeFilter = filterMovieTime(result);
              if (resultTimeFilter.length > 0) {
                setSearchError(false);
              }
              else {
                setSearchError(true);
              }
              setFilterTimeMoviesCollection(resultTimeFilter);
            }
          })
          .catch((err) => {
            setSearchServerError(true);
          })
      }


  }

  /* Сотрировка фильмов по времени */ 
  function filterMovieTime(collection) {
    let result = [];
    collection.forEach((movie) => {
        if (movie.duration <= 40) {
            result.push(movie);
        }
    })
    return result;
  }
  /* Поиск фильмов по избранному */
  function findSaveMovies(movie) {
    console.log(movie);
    console.log(saveMovieCollection);
    if (saveMovieCollection.length > 0) {
      setFilterTimeMoviesSaveCollection(searchMovies(saveMovieCollection, movie));
      setSaveMovieCollection(searchMovies(saveMovieCollection, movie))
    }
    else {
        console.log('Fail');

    }
}
  /* Сохранить фильм в избранное */

  function saveMovieInCollection(movie) {
    const jwt = localStorage.getItem('jwt');
    setSaveMovie({jwt , movie})
      .then((movie) => {
        setSaveMovieCollection([...saveMovieCollection, movie]);
        let saveMoviesList = JSON.parse(localStorage.getItem('savedMovies'))
        saveMoviesList = saveMoviesList.concat(movie) 
        localStorage.setItem('savedMovies', JSON.stringify(saveMoviesList))
        console.log(movie);
      })
  }
  /* Удалить фильм из избранного */

  function deleteMovieInCollection(movie) {
    const jwt = localStorage.getItem('jwt');
    const movieId = movie._id || saveMovieCollection.find((item) => item.movieId === movie.id)._id;
    console.log(saveMovieCollection);
    deleteSaveMovie({jwt , movieId})
      .then((data) => {
        let saveMoviesList = JSON.parse(localStorage.getItem('savedMovies'))
        const index = saveMoviesList.findIndex(item => item.movieId === data.movieId)
        saveMoviesList.splice(index, 1) 
        setSaveMovieCollection(saveMoviesList)
        localStorage.setItem('savedMovies', JSON.stringify(saveMoviesList))
      })
  }

  /* Фильтрация фильмов по названию */
  function searchMovies(collection, searchText) {
    let result = [];
    collection.forEach((movie) => {
        if (movie.nameRU.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
            result.push(movie);
        }
    })
    console.log(result);
    return result;
  } 

  /* Переключатель короткометражек */
  function changeCheckBox() {
    setIsChangeBox(!isChangeBox)
  }

  /* Изменить информацию о пользователе */

  function changeUserInfo({name , email}) {
    const jwt = localStorage.getItem('jwt');
    changeProfile({jwt, name, email})
      .then((value) => {
        console.log(value);
      })
  }

  /* Выход из системы */
  
  function logOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('savedMovies');
    setSaveMovieCollection([])
    setLoggedIn(false)
    history.push('/');
  }
  useEffect(() => {
    console.log('work');
    if (isChangeBox) {
      console.log(isChangeBox);
        if (pathname.pathname === "/movies") {
          console.log('work 2');
          console.log(moviesCollection);
            if (moviesCollection.length > 0) {
              
                const result = filterMovieTime(filterMoviesCollection);
                console.log(result);
                if (result.length > 0) {
                  setSearchError(false);
                }
                else {
                  setSearchError(true);
                }
                setFilterTimeMoviesCollection(result);
            }
        }
        else if (pathname.pathname === "/saved-movies") {
            const result = filterMovieTime(saveMovieCollection);
            if (result.length > 0) {
              setSearchError(false);
            }
            else {
              setSearchError(true);
            }
            setFilterTimeMoviesSaveCollection(result);
        }

    }
}, [isChangeBox])

  useEffect(() => {
    localStorage.movies && setFilterMoviesCollection(JSON.parse(localStorage.getItem('movies')))
    setIsChangeBox(getCheckBox)
  }, [])

  return (
    <>
    <CurrentUser.Provider value={currentUser}>
      <div className="content">
          <Header loggedIn={loggedIn}/>
            <main>
              <Switch>
                <Route exact  path='/'>
                  <Main />
                </Route>
                <ProtectedRoute exact path="/movies" loggedIn={loggedIn}>
                    <Movies 
                      findMovies={findMovies}
                      changeCheckBox={changeCheckBox} 
                      isChangeBox={isChangeBox} 
                      moviesCollection={isChangeBox ? filterTimeMoviesCollection : filterMoviesCollection}
                      isLoadingMovies={isLoadingMovies}
                      searchError={searchError}
                      searchServerError={searchServerError}
                      saveMovieCollection={saveMovieCollection}
                      saveMovieInCollection={saveMovieInCollection}
                      deleteMovieInCollection={deleteMovieInCollection}
                      findSaveMovies={findSaveMovies}
                    />
                </ProtectedRoute>
                <ProtectedRoute exact path="/saved-movies" loggedIn={loggedIn}>
                  <SavedMovies 
                    findMovies={findMovies}
                    changeCheckBox={changeCheckBox} 
                    isChangeBox={isChangeBox} 
                    moviesCollection={isChangeBox ? filterTimeMoviesSaveCollection : saveMovieCollection}
                    isLoadingMovies={isLoadingMovies}
                    searchError={searchError}
                    searchServerError={searchServerError}
                    saveMovieCollection={saveMovieCollection}
                    saveMovieInCollection={saveMovieInCollection}
                    deleteMovieInCollection={deleteMovieInCollection}
                    findSaveMovies={findSaveMovies}
                  />
                </ProtectedRoute>
                <ProtectedRoute exact path="/profile" loggedIn={loggedIn}>
                  <Profile
                    changeUserInfo={changeUserInfo}
                    logOut={logOut}
                  />
                </ProtectedRoute>
                <Route exact  path='/signin'>
                  <Login
                  onLogin={onLogin}
                  />
                </Route>
                <Route exact  path='/signup'>
                  <Register
                    onRegister={onRegister}
                    registerError={registerError}
                  />
                </Route>
                <Route exact  path='*'>
                  <NotFound />
                </Route>
              </Switch>
            </main>
      </div>
        <Footer></Footer>
      </CurrentUser.Provider>
    </>

  );
}

export default App;
