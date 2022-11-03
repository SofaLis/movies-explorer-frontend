import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const history = useNavigate();

  function handleLogIn(email, password) {
    setIsLoggedIn(true);
    history('/');
  }

  function handleRegister(name, email, password) {
    setIsLoggedIn(true);
    history('/');
  }

  function handleLogOff(name, email, password) {
    setIsLoggedIn(false);
    history('/');
  }

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
        <Route path="/movies" element={<Movies isLoggedIn={isLoggedIn} />} />
        <Route path="/signup" element={<Register onRegister={handleRegister} />} />
        <Route path="/signin" element={<Login onRegister={handleLogIn} />} />
        <Route path="/profile" element={<Profile onRegister={handleLogIn} onClick={handleLogOff}
        isLoggedIn={isLoggedIn} />} />
        <Route path="/saved-movies" element={<SavedMovies isLoggedIn={isLoggedIn} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
