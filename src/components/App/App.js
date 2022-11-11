import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';

import * as auth from '../../utils/auth';
import api from '../../utils/MainApi.js';
import apiMov from '../../utils/MoviesApi';
import ProtectedRoute from '../../utils/ProtectedRoute';

import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  //проверка на авторизацию
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //данные пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  //карточки которые должны быть загружены из стороннего апи
  const [movieList, setMovieList] = React.useState([]);
  const [isMovie, setIsMovie] = React.useState([]);
  //изменяем статус лайка 
  const [isLike, setIsLike] = React.useState(false);
  //Загрузка для плеодера
  const [isLoad, setIsLoad] = React.useState(false);
  //не уверена, что заработает, но должно
  const [isSearch, setIsSearch] = React.useState('');
  const history = useHistory();

  React.useEffect(() => {
    auth.getContent()
      .then((user) => {
        setIsLoggedIn(true);
        history.push("/");
        setCurrentUser(user);
      })
      .catch((err) => {
        history.push("/");
        setIsLoggedIn(false);
        console.log(err)
      });
  }, [history]);

  React.useEffect(() => {
    Promise.all([
      api.getUserInfo()])
      .then(([users]) => {
        setCurrentUser(users);
      })
      .catch((err) => {
        console.log(`${err}, попробуйте ещё`);
      })
  }, [isLoggedIn, history]);

  React.useEffect(() => {
    apiMov.getMovies()
      .then((movies) => {
        setIsMovie(movies)
      })
  }, [isMovie]);


  //ПОЛЯ АВТОРИЗАЦИИ
  function handleLogIn(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        history.push('/');
        setCurrentUser(res);
        console.log(email);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleRegister(name, email, password) {
    auth.register(name, email, password)
      .then((res) => {
        handleLogIn(email, password)
        setIsLoggedIn(true);
        history.push('/');
        setCurrentUser(res);
        console.log(name);
      })
      .catch((res) => {
      })
  }

  function handleSetUser(name, email) {
    api.setUser(name, email)
      .then((res) => {
        setCurrentUser(res);
        console.log(name);
      })
      .catch((res) => {
      })
  }

  function handleLogOff() {
    auth.logoff()
      .then((res) => {
        setIsLoggedIn(false);
        history.push('/signin');
        setCurrentUser({});
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(movie) {
    console.log(movie.id)
    api.like(movie)
      .then((res) => {
        setIsLike(true)
      })
      .catch((err) => console.log(err));
  }

  function handleCardDislike(movie) {
    api.deleteMovie(movie.id)
      .then((res) => {
        setIsLike(false)
        console.log(movie.id)
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>

          <Route exact path="/">
            <Main isLoggedIn={isLoggedIn} />
          </Route>

          <ProtectedRoute path="/movies" component={Movies} isLoggedIn={isLoggedIn}
          movies={isMovie} onCardLike={handleCardLike} isLike={isLike} onCardDislike={handleCardDislike} />

          <ProtectedRoute path="/profile" component={Profile} isLoggedIn={isLoggedIn} onClickUpdate={handleSetUser}
            onRegister={handleLogIn} onClick={handleLogOff} />

          <ProtectedRoute path="/saved-movies" component={SavedMovies} isLoggedIn={isLoggedIn} />

          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>

          <Route path="/signin">
            <Login onRegister={handleLogIn} />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>

        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
