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

import { TEXT_OK, TEXT_OK_REG, TEXT_OK_LOG, ERR500, ERR409, ERR400, ERR_NOT_MOV } from '../../utils/constant';

function App() {
  //проверка на авторизацию
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //данные пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  const [isMovie, setIsMovie] = React.useState([]);
  const [isMovieSearch, setIsMovieSearch] = React.useState([]);
  const [isMovieSave, setIsMovieSave] = React.useState([]);
  const [isMovieSaveSearch, setIsMovieSaveSearch] = React.useState([]);
  //Загрузка для плеодера
  const [isLoading, setIsLoading] = React.useState(true);
  //не уверена, что заработает, но должно
  const [isSearch, setIsSearch] = React.useState('');
  const [isBigErr, setIsBigErr] = React.useState({ text: '' });
  const [isErrAuth, setIsErrAuth] = React.useState({ text: '' });
  const [isAddForm, setIsAddForm] = React.useState(false);
  const history = useHistory();

  //отдельный блок для авторизации/регистрации

  React.useEffect(() => {
    auth.getContent()
      .then((user) => {
        setIsLoggedIn(true);
        history.push("/movies");
        setCurrentUser(user);
      })
      .catch((err) => {
        setIsLoggedIn(false);
      });
  }, [history]);

  React.useEffect(() => {
    Promise.all([
      api.getUserInfo()])
      .then(([users]) => {
        setCurrentUser(users);
      })
      .catch((err) => {
      })
  }, [history]);

  function handleLogIn(email, password) {
    setIsAddForm(true)
    auth.authorize(email, password)
      .then((res) => {
        setIsAddForm(false)
        setIsLoggedIn(true);
        setCurrentUser(res);
        history.push('/movies');
        console.log(res);
        setIsErrAuth({ text: TEXT_OK_LOG });
      })
      .catch((err) => {
        setIsAddForm(false)
        if (err === 400) {
          setIsErrAuth({ text: ERR400 });
        } else {
          setIsErrAuth({ text: ERR500 });
        }
      })
  }

  function handleRegister(name, email, password) {
    setIsAddForm(true)
    auth.register(name, email, password)
      .then((res) => {
        handleLogIn(email, password)
        setIsLoggedIn(true);
        history.push('/movies');
        setCurrentUser(res);
        setIsAddForm(false)
        setIsErrAuth({ text: TEXT_OK_REG });
      })
      .catch((err) => {
        console.log(err)
        if (err === 409) {
          setIsErrAuth({ text: ERR409 });
        } else {
          setIsErrAuth({ text: ERR500 });
        }
        setIsAddForm(false)
      })
  }

  function handleSetUser(name, email) {
    setIsAddForm(true)
    api.setUser(name, email)
      .then((res) => {
        setCurrentUser(res);
        setIsAddForm(false)
        setIsErrAuth({ text: TEXT_OK });
      })
      .catch((err, res) => {

        setIsAddForm(false)
        if (err === 409) {
          setIsErrAuth({ text: ERR409 });
        } else {
          setIsErrAuth({ text: ERR500 });
        }
      })
  }

  function handleLogOff() {
    auth.logoff()
      .then((res) => {
        setIsLoggedIn(false);
        history.push('/');
        setCurrentUser({});
      })
      .catch((err) => {
        setIsErrAuth({ text: ERR500 })
      });
  }

  //РАБОТА С ФИЛЬМАМИ
  // useEffects

  React.useEffect(() => {
    getLikes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  React.useEffect(() => {
    searchFromMovies(false)
  }, [isMovie]);

  function getLikes() {
    api.getLikes()
      .then((res) => {
        setIsMovieSave(res.filter((movie) => movie.owner === currentUser._id))
        setIsLoading(false)
      })
      .catch(() => {
        setIsBigErr({ text: ERR500 })
      })
  }

  //const

  const checkLikeMov = (id) => isMovieSave.some((movie) => parseInt(movie.movieId) === id);
  const checkId = (id) => isMovieSave.find((movie) => parseInt(movie.movieId) === id);

  // function

  function getMovies() {
    apiMov.getMovies()
      .then((res) => {
        const movie = res.map((movie) => {
          movie.isLike = checkLikeMov(movie.id);
          return movie;
        });
        setIsMovie(movie)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsBigErr({ text: ERR500 });
      })
  }

  function searchFromMovies(saveMovieRouter) {
    setIsBigErr({ text: '' })
    let item = saveMovieRouter ? isMovieSave : isMovie;
    const filter = item.filter((movie) => movie.nameRU.toLowerCase().includes(isSearch.toLowerCase()));
    filter.length === 0 ? setIsBigErr({ text: ERR_NOT_MOV }) :
      saveMovieRouter ? setIsMovieSave(filter) : setIsMovieSearch(filter);
    console.log(isBigErr)
  };

  function handleSearchMoviesClick(saveMovieRouter) {
    saveMovieRouter ?
      searchFromMovies(true) :
      getMovies()
    console.log(searchFromMovies(true))
  }

  function handleCardLike(movie) {
    api.like(movie)
      .then((res) => {
        setIsMovieSave([res, ...isMovieSave]);
        console.log(isMovieSave)
      })
      .catch((err) => console.log(err));
  }

  function handleCardDislike(id) {
    api.deleteMovie(id)
      .then((res) => {
        const newMovies = isMovieSave.filter((movie) => movie._id !== res._id);
        // const newMoviesSearch = isMovieSave.filter((movie) => movie._id !== res._id);
        setIsMovieSave(newMovies)
        // setIsMovieSaveSearch(newMoviesSearch)
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
            setIsLoading={setIsLoading} isLike={checkLikeMov} setMovie={setIsMovieSearch} />

          <ProtectedRoute path="/profile" component={Profile} isLoggedIn={isLoggedIn}
            onRegister={handleSetUser} onClick={handleLogOff} isErr={isErrAuth} setIsErr={setIsErrAuth}
            isAddForm={isAddForm} />

          <ProtectedRoute path="/saved-movies" component={SavedMovies} isLoggedIn={isLoggedIn}
            movies={isMovieSave} onCardLike={handleCardLike} onCardDislike={handleCardDislike}
            isLoading={isLoading} isSearch={isSearch} setIsSearch={setIsSearch} onClick={handleSearchMoviesClick}
            isBigErr={isBigErr} setIsBigErr={setIsBigErr} setMovies={setIsMovieSave} checkId={checkId}
            setIsLoading={setIsLoading} isLike={checkLikeMov} />

          <Route path="/signup">
            <Register onRegister={handleRegister} isErr={isErrAuth} setIsErr={setIsErrAuth} isAddForm={isAddForm} />
          </Route>

          <Route path="/signin">
            <Login onRegister={handleLogIn} isErr={isErrAuth} setIsErr={setIsErrAuth} isAddForm={isAddForm} />
          </Route>
          
          <ProtectedRoute path="*" component={NotFound} isLoggedIn={isLoggedIn} />

        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
