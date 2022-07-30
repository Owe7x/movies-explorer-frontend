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
  /* Toggle короткометражек Фильмов */
  const [isChangeBox, setIsChangeBox] = useState(true);
    /* Toggle короткометражек Сохраненных Фильмов */
  const [isChangeBoxSave, setIsChangeBoxSave] = useState(true);
  /* Отфильтрованные фильмы */
  const [filterMoviesCollection, setFilterMoviesCollection] = useState([]);
    /* Отфильтрованные сохраненные фильмы */
  const [filterMoviesSaveCollection, setFilterMoviesSaveCollection] = useState([]);
  /* Отфильтрованные фильмы по времени */
  const [filterTimeMoviesCollection , setFilterTimeMoviesCollection ] = useState([]);
  /* Отфильтрованные сохраненные фильмы по времени */
  const [filterTimeMoviesSaveCollection , setFilterTimeMoviesSaveCollection ] = useState([]);
    /* Сохраненные фильмы */
    const [saveMovieCollection, setSaveMovieCollection] = useState([]);
  /* Все фильмы  */
  const [moviesCollection, setMoviesCollection] = useState([]);
  /* Прелоадер загрузки фильмов */
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  /* Ошибка поиска фильма */
  const [searchError, setSearchError] = useState(false);
  /* Ошибка сервера поиска фильмов */
  const [searchServerError, setSearchServerError] = useState(false);
  /* Ошибка регистрации */
  const [registerError , setRegisterError] = useState('')
  const [profileError, setProfileError] = useState("");
  const [loginError, setLoginError] = useState("");
  /* Данные о пользователе */
  const [currentUser, setCurrentUser] = useState({});

  /* Переход по страницам*/
  const history = useHistory();
  const pathname = useLocation();
  /* Достаем из localStorate состояние checkbox Фильмов */
  let getCheckBox = JSON.parse(localStorage.getItem('isChangeBox'))


  useEffect(() => {
      console.log('Получить все фильмы');
  }, [])
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

        if(data.token) {

          localStorage.setItem('jwt', data.token);
          setLoggedIn(true)
          history.push('/movies');
          getSaveMovies(data.token)
            .then((data) => {
              setSaveMovieCollection(data)
              localStorage.setItem('savedMovies', JSON.stringify(data));

            })
          getUserInfo(data.token)
            .then((data) => {

              setCurrentUser(data);
              localStorage.setItem('currentUser', JSON.stringify(data)) 
            })
            .catch((err) => {
                console.log(err);
            })
        }
      })
      .catch((err) => {
        if (err === '401') return setLoginError('Неправильный логин или пароль');
        if (err === '500') return setLoginError('Ошибка');
        setLoginError('Попробуйте еще раз!');
        console.log(err.status);
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
      if(moviesCollection.length === 0) {
        MoviesApi.getMoives()
          .then((res) => {
            setMoviesCollection(res);
            localStorage.setItem('moviesCollection', JSON.stringify(res));
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
              localStorage.setItem('moviesShort', JSON.stringify(resultTimeFilter));
            }
          })
          .catch((err) => {
            setSearchServerError(true);
          })
      } else {  
       const movieCollection = JSON.parse(localStorage.getItem('moviesCollection'))

       const result = searchMovies(movieCollection, searchText);
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
         localStorage.setItem('moviesShort', JSON.stringify(resultTimeFilter));
       }

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
    setIsLoadingMovies(true);
    if(movie) {
      
      const movieSaveCollection = JSON.parse(localStorage.getItem('savedMovies'))

      const result = searchMovies(movieSaveCollection, movie);
      if (result.length > 0) {
        setSearchError(false);
      } 
      else {
        setSearchError(true);
      }
      setFilterMoviesSaveCollection(result)
      setIsLoadingMovies(false);
      console.log(filterMoviesSaveCollection);
      if (isChangeBoxSave) {
        const resultTimeFilter = filterMovieTime(result);
        if (resultTimeFilter.length > 0) {
          setSearchError(false);
        }
        else {
          setSearchError(true);
        }
        filterTimeMoviesSaveCollection(resultTimeFilter);
      }
    } else {
      setFilterMoviesSaveCollection(JSON.parse(localStorage.getItem('savedMovies')))
      setIsChangeBoxSave(false)
      setIsLoadingMovies(false);

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
      })
  }
  /* Удалить фильм из избранного */

  function deleteMovieInCollection(movie) {
    const jwt = localStorage.getItem('jwt');
    const movieId = movie._id || saveMovieCollection.find((item) => item.movieId === movie.id)._id;
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
    return result;
  } 

  /* Переключатель короткометражек */
  function changeCheckBox() {
    if(pathname.pathname === "/movies") {
      setIsChangeBox(!isChangeBox)
    } else if (pathname.pathname === "/saved-movies") {
      setIsChangeBoxSave(!isChangeBoxSave)
    }

  }

  /* Изменить информацию о пользователе */

  function changeUserInfo({name , email}) {
    const jwt = localStorage.getItem('jwt');
    if (name === currentUser.user.name && email === currentUser.user.email) {
      setProfileError("Введенные данные соотвествуют данным профиля")
    } else {
      changeProfile({jwt, name, email})
      .then((value) => {

        if(value._id) {
          setCurrentUser({user : value})
          setProfileError("Данные профиля успешно изменены");
        } else if (value.message) {
          setProfileError(value.message);
        }

      }).catch((err) => setProfileError("Произошла ошибка при обновлении профиля"));
    }

  }

  /* Выход из системы */
  
  function logOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('isChangeBoxSave');
    localStorage.removeItem('movies');
    localStorage.removeItem('SaveMoviesShort');
    localStorage.removeItem('isChangeBox');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('textForm');
    localStorage.removeItem('textFormSave');
    localStorage.removeItem('moviesShort');
    setMoviesCollection([]);
    setFilterMoviesCollection([]);
    setFilterTimeMoviesCollection([]);
    setFilterTimeMoviesSaveCollection([]);
    setSaveMovieCollection([]);
    setMoviesCollection([]);
    setLoggedIn(false)
    history.push('/');
  }

  useEffect(() => {
    if (isChangeBox) {
        if (pathname.pathname === "/movies") {
            if (moviesCollection.length > 0) {
                console.log(filterMoviesCollection);
                const result = filterMovieTime(filterMoviesCollection);
                console.log(result);
                if (result.length > 0) {
                  setSearchError(false);
                }
                else {
                  setSearchError(true);
                }
                setFilterTimeMoviesCollection(result);
                localStorage.setItem('moviesShort', JSON.stringify(result));
            }
        }
    }
    if(isChangeBoxSave) {
      if(pathname.pathname === "/saved-movies") {
        console.log(saveMovieCollection);
        const result = filterMovieTime(saveMovieCollection);
        console.log(result);
        if (result.length > 0) {
          setSearchError(false);
        }
        else {
          setSearchError(true);
        }
        setFilterTimeMoviesSaveCollection(result);
      }
    } else {
      setSearchError(false);
    }
}, [isChangeBox, isChangeBoxSave])

  useEffect(() => {
    localStorage.movies && setFilterMoviesCollection(JSON.parse(localStorage.getItem('movies')))
    localStorage.moviesShort && setFilterTimeMoviesCollection(JSON.parse(localStorage.getItem('moviesShort')))


    setIsChangeBox(getCheckBox)
    setSearchError(false);
    setIsChangeBoxSave(false)
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
                      isChangeBoxSave= {isChangeBoxSave}
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
                    isChangeBoxSave= {isChangeBoxSave}
                    moviesCollection={isChangeBoxSave ? filterTimeMoviesSaveCollection : filterMoviesSaveCollection}
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
                    profileError={profileError}
                    setProfileError={setProfileError}
                  />
                </ProtectedRoute>
                <ProtectedRoute exact path="/signin" loggedIn={!loggedIn}>
                  <Login
                    onLogin={onLogin}
                    loginError={loginError} 
                    setLoginError={setLoginError}
                    />
                </ProtectedRoute>
                <ProtectedRoute exact path="/signup" loggedIn={!loggedIn}>
                <Register
                    onRegister={onRegister}
                    registerError={registerError}
                  />
                </ProtectedRoute>

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
