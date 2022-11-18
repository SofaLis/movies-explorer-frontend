/* eslint-disable react-hooks/exhaustive-deps */
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
  const [isMovie, setIsMovie] = React.useState([]);
  const [isMovieSearch, setIsMovieSearch] = React.useState([]);
  const [isMovieSave, setIsMovieSave] = React.useState([]);
  //Загрузка для плеодера
  const [isLoading, setIsLoading] = React.useState(true);
  //не уверена, что заработает, но должно
  const [isSearch, setIsSearch] = React.useState('');
  const [isSearchSave, setIsSearchSave] = React.useState('');
  const [isBigErr, setIsBigErr] = React.useState({ text: '' });
  const [isErrAuth, setIsErrAuth] = React.useState({ text: '' });
  const [isAddForm, setIsAddForm] = React.useState(false);
  const history = useHistory();

  //отдельный блок для авторизации/регистрации

  React.useEffect(() => {
    auth.getContent()
      .then((user) => {
        setIsLoggedIn(true);
        history.push("/");
        setCurrentUser(user);
        console.log(user)
      })
      .catch((err) => {
        history.push("/");
        setIsLoggedIn(false);
        console.log(err)
      });
  }, [history]);

  React.useEffect(() => {
    Promise.all([
    api.getUserInfo() ])
      .then(([users]) => {
        setCurrentUser(users);
      })
      .catch((err) => {
      })
  }, [history]);

  function handleRegister(name, email, password) {
    setIsAddForm(true)
    auth.register(name, email, password)
      .then((res) => {
        handleLogIn(email, password)
        setIsLoggedIn(true);
        history.push('/');
        setCurrentUser(res);
        setIsAddForm(false)
      })
      .catch((err) => {
        setIsErrAuth({ text: 'Простите, произошла ошибка' });
        setIsAddForm(false)
      })
  }

  function handleSetUser(name, email) {
    setIsAddForm(true)
    api.setUser(name, email)
      .then((res) => {
        setCurrentUser(res);
        setIsAddForm(false)
        console.log(res);
      })
      .catch((err, res) => {
        setIsAddForm(false)
        setIsErrAuth({ text: 'Простите, произошла ошибка' });
      })
  }

  function handleLogOff() {
    auth.logoff()
      .then((res) => {
        setIsLoggedIn(false);
        history.push('/signin');
        setCurrentUser({});
      })
      .catch((err) => {
        setIsErrAuth({ text: 'Простите, произошла ошибка' })
      });
  }

  function handleLogIn(email, password) {
    setIsAddForm(true)
    auth.authorize(email, password)
      .then((res) => {
        setIsAddForm(false)
        setIsLoggedIn(true);
        setCurrentUser(res);
        setIsMovieSearch(JSON.parse(localStorage.removeItem("filtermovies")));
        history.push('/');
        console.log(email);
      })
      .catch((err) => {
        setIsAddForm(false)
        setIsErrAuth({ text: 'Простите, произошла ошибка' });
      })
  }

  //РАБОТА С ФИЛЬМАМИ

  React.useEffect(() => {
    setIsMovieSearch(JSON.parse(localStorage.getItem("filtermovies")));
    api.getLikes()
      .then((res) => {
        setIsMovieSave(res)
        setIsLoading(false)
      })
      .catch(() => {
        setIsBigErr({ text: 'Простите, произошла ошибка' })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  React.useEffect(() => {
    searchFromMovies(false, isSearch)
  }, [isMovie]);

  const checkLikeMov = (id) => isMovieSave.some((movie) => parseInt(movie.movieId) === id);
  const checkId = (id) => isMovieSave.find((movie) => parseInt(movie.movieId) === id);

  function getMovies() {
    apiMov.getMovies()
      .then((res) => {
        const movie = res.map((movie) => {
          movie.isLike = checkLikeMov(movie.id);
          return movie;
        });
        setIsMovie(movie)
        console.log(movie)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsBigErr({ text: 'Простите, произошла ошибка сервера' });
      })
  }

  function searchFromMovies(saveMovieRouter) {
    let item = saveMovieRouter ? isMovieSave : isMovie;
    let search = saveMovieRouter ? isSearchSave.toLowerCase() : isSearch.toLowerCase()
    const filter = item.filter((movie) => movie.nameRU.toLowerCase().includes(search));
    filter.length === 0 ? setIsBigErr({ text: 'Ничего не найдено' }) :
      saveMovieRouter ? setIsMovieSave(filter) : setIsMovieSearch(filter);
    !saveMovieRouter && localStorage.setItem('filtermovies', JSON.stringify(filter));
    setIsBigErr({ text: '' })
  };

  function handleSearchMoviesClick(saveMovieRouter) {
    saveMovieRouter ?
      searchFromMovies(true, isSearchSave) :
      getMovies()

  }

  function handleCardLike(movie) {
    api.like(movie)
      .then((res) => {
        setIsMovieSave([res, ...isMovieSave]);
        console.log(res)
        localStorage.setItem('filtermovies', JSON.stringify(movie));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDislike(id) {
    api.deleteMovie(id)
      .then((res) => {
        const newMovies = isMovieSave.filter((movie) => movie._id !== res._id);
        setIsMovieSave(newMovies)
        console.log(res)
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
            movies={isMovieSearch} onCardLike={handleCardLike} onCardDislike={handleCardDislike}
            isLoading={isLoading} isSearch={isSearch} setIsSearch={setIsSearch} onClick={handleSearchMoviesClick}
            isBigErr={isBigErr} setIsBigErr={setIsBigErr} setMovies={setIsMovieSearch} checkId={checkId}
            setIsLoading={setIsLoading} isLike={checkLikeMov} />

          <ProtectedRoute path="/profile" component={Profile} isLoggedIn={isLoggedIn}
            onRegister={handleSetUser} onClick={handleLogOff} isErr={isErrAuth} setIsErr={setIsErrAuth}
            isAddForm={isAddForm} />

          <ProtectedRoute path="/saved-movies" component={SavedMovies} isLoggedIn={isLoggedIn}
            movies={isMovieSave} onCardLike={handleCardLike} onCardDislike={handleCardDislike}
            isLoading={isLoading} isSearch={isSearchSave} setIsSearch={setIsSearchSave} onClick={handleSearchMoviesClick}
            isBigErr={isBigErr} setIsBigErr={setIsBigErr} setMovies={setIsMovieSave} checkId={checkId}
            setIsLoading={setIsLoading} isLike={checkLikeMov} />

          <Route path="/signup">
            <Register onRegister={handleRegister} isErr={isErrAuth} setIsErr={setIsErrAuth} isAddForm={isAddForm} />
          </Route>

          <Route path="/signin">
            <Login onRegister={handleLogIn} isErr={isErrAuth} setIsErr={setIsErrAuth} isAddForm={isAddForm} />
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
