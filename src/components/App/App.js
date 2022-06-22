import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main'
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile'
import Register from '../Register/Register'
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  
  let curLocation = window.location.href

  return (
    <BrowserRouter>
    <div className="app">
            { curLocation === 'http://localhost:3000/' && <Header  loggedIn={loggedIn}/> }
            { curLocation === 'http://localhost:3000/movies' && <Header loggedIn={loggedIn}/> }
            { curLocation === 'http://localhost:3000/saved-movies' && <Header loggedIn={loggedIn} /> }
            { curLocation === 'http://localhost:3000/profile' && <Header loggedIn={loggedIn}/> }
      <main>
      <Routes>
          <Route path='/' element={<Main />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/saved-movies' element={<SavedMovies />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/signin' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            <Route path='*' element={<NotFound /> }/>
        </Routes>
      </main>

        <Footer></Footer>
    </div>
  </BrowserRouter>


  );
}

export default App;
