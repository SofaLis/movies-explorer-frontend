/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

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
import ProtectedRouteAuth from '../../utils/ProtectedRouteAuth';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import {
  TEXT_OK, TEXT_OK_REG, TEXT_OK_LOG, ERR500, ERR409, ERR400, ERR_NOT_MOV, START_MOV,
  LINK_SIGNUP, LINK_SIGNIN, LINK_MAIN, LINK_MOVIES, LINK_MOVIES_SAVE, LINK_PROFILE
} from '../../utils/constant';

function App() {
  //проверка на авторизацию
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //данные пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  const [isMovie, setIsMovie] = React.useState([]);
  const [isMovieSearch, setIsMovieSearch] = React.useState([]);
  const [isMovieSave, setIsMovieSave] = React.useState([]);
  const [isMovieSaveSearch, setIsMovieSaveSearch] = React.useState([]);
  const [isSeeMovie, setIsSeeMovie] = React.useState([]);
  //Загрузка для плеодера
  const [isLoading, setIsLoading] = React.useState(true);
  //не уверена, что заработает, но должно
  const [isSearch, setIsSearch] = React.useState('');
  const [isSearchSave, setIsSearchSave] = React.useState('');
  const [isBigErr, setIsBigErr] = React.useState({ text: '' });
  const [isErrAuth, setIsErrAuth] = React.useState({ text: '' });
  const [isAddForm, setIsAddForm] = React.useState(false);
  const [sessionStorage, setSessionStorage] = React.useState('');
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    setSessionStorage(localStorage.getItem('location') || location.pathname);
  }, [history]);

  //отдельный блок для авторизации/регистрации

  React.useEffect(() => {
    auth.getContent()
      .then((user) => {
        setIsLoggedIn(true);
        localStorage.setItem('location', sessionStorage)
        history.push(location);
        setCurrentUser(user);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        localStorage.clear();
        history.push('/');
        setCurrentUser({});
        setIsMovie([])
        setIsMovieSave([])
      });
  }, [history]);

  React.useEffect(() => {
    Promise.all([
      api.getUserInfo()])
      .then(([users, res]) => {
        setCurrentUser(users);
      })
      .catch((err) => {
        if (err === 401) {
          handleLogOff()
        }
      })
  }, []);

  function handleLogIn(email, password) {
    setIsAddForm(true)
    auth.authorize(email, password)
      .then((res) => {
        setIsAddForm(false)
        setIsLoggedIn(true);
        setCurrentUser(res);
        history.push('/movies');
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
        setIsAddForm(false)
        setIsErrAuth({ text: TEXT_OK_REG });
      })
      .catch((err) => {
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
        if (err === 401) {
          setIsLoggedIn(false);
          localStorage.clear();
          history.push('/');
          setCurrentUser({});
          setIsMovie([])
          setIsMovieSave([])
        }
      })
  }

  function handleLogOff() {
    auth.logoff()
      .then((res) => {
        setIsLoggedIn(false);
        history.push('/');
        setCurrentUser({});
        setIsMovie([])
        setIsMovieSave([])
        localStorage.clear();
      })
      .catch((err) => {
        setIsErrAuth({ text: ERR500 })
        setIsLoggedIn(false);
        localStorage.clear();
        history.push('/');
        setCurrentUser({});
        setIsMovie([])
        setIsMovieSave([])
      });
  }

  //РАБОТА С ФИЛЬМАМИ
  // useEffects

  React.useEffect(() => {
    getLikes()
    console.log(localStorage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  React.useEffect(() => {
    getMovies()
  }, [isMovieSave]);

  React.useEffect(() => {
    setIsMovie(isMovie)
    setIsMovieSearch(isMovieSearch)
  }, [isMovie, isMovieSave]);

  React.useEffect(() => {
    setIsSeeMovie(isMovieSaveSearch)
    setIsMovieSave(isMovieSave)
  }, [isMovieSave]);

  React.useEffect(() => {
    if (isLoggedIn) {
      if (!localStorage.getItem("moviesApi")) {
        apiMov.getMovies()
          .then((res) => {
            const movie = res.map((movie) => {
              movie.isLike = checkLikeMov(movie.id);
              return movie;
            });
            localStorage.setItem("moviesApi", JSON.stringify(movie));
            localStorage.setItem("movies", JSON.stringify(movie));
            setIsMovie(JSON.parse(localStorage.getItem("moviesApi")))
            setIsMovieSearch(JSON.parse(localStorage.getItem("movies")));
          })
          .catch((err) => {
            if (err === 401) {
              setIsBigErr({ text: START_MOV })
            } else {
              setIsBigErr({ text: ERR500 });
            }
          })
      } else {
        setIsMovie(JSON.parse(localStorage.getItem("moviesApi")))
        setIsMovieSearch(JSON.parse(localStorage.getItem("movies")));
      }
    }

  }, [isLoggedIn]);


  function getLikes() {
    api.getLikes()
      .then((res) => {
        setIsMovieSave(res)
        setIsMovieSaveSearch(res)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsBigErr({ text: ERR500 });
      })
  }


  //const

  const checkLikeMov = (id) => isMovieSave.some((movie) => parseInt(movie.movieId) === id);
  const checkId = (id) => isMovieSave.find((movie) => parseInt(movie.movieId) === id);

  // function

  function getMovies() {
    const movie = isMovie.map((movie) => {
      movie.isLike = checkLikeMov(movie.id);
      return movie;
    });
    const movieSerch = isMovieSearch.map((movie) => {
      movie.isLike = checkLikeMov(movie.id);
      return movie;
    });
    setIsMovie(movie)
    setIsMovieSearch(movieSerch)
    setIsMovieSearch(JSON.parse(localStorage.getItem("movies")) || [])
    setIsLoading(false)
  }


  function searchFromMovies() {
    setIsBigErr({ text: '' })
    let item = isMovie;
    const filter = item.filter((movie) => movie.nameRU.toLowerCase().includes(isSearch.toLowerCase()));
    filter.length === 0 ? setIsBigErr({ text: ERR_NOT_MOV }) : setIsMovieSearch(filter);
    localStorage.setItem("movies", JSON.stringify(filter))
    setIsLoading(false)
  };

  function handleSearchMoviesClick() {
    searchFromMovies()
    getMovies()
  }

  function handleCardLike(movie) {
    api.like(movie)
      .then((res) => {
        setIsMovieSave([res, ...isMovieSave]);
        setIsMovieSaveSearch([res, ...isMovieSaveSearch]);
      })
      .catch((err) => {
        console.log(err)
        if (err === 401) {
          setIsLoggedIn(false);
          localStorage.clear();
          history.push('/');
          setCurrentUser({});
          setIsMovie([])
          setIsMovieSave([])
        }
      })
  }

  function handleCardDislike(id) {
    api.deleteMovie(id)
      .then((res) => {
        const newMovies = isMovieSave.filter((movie) => movie._id !== res._id);
        const newMoviesSee = isSeeMovie.filter((movie) => movie._id !== res._id);
        const newMoviesSearch = isMovieSaveSearch.filter((movie) => movie._id !== res._id);
        setIsMovieSaveSearch(newMoviesSearch)
        setIsSeeMovie(newMoviesSee)
        setIsMovieSave(newMovies)
      })
      .catch((err, res) => {
        if (err === 401) {
          setIsLoggedIn(false);
          localStorage.clear();
          history.push('/');
          setCurrentUser({});
          setIsMovie([])
          setIsMovieSave([])
        }
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>

          <Route exact path={LINK_MAIN}>
            <Main isLoggedIn={isLoggedIn} />
          </Route>

          <ProtectedRoute path={LINK_MOVIES} component={Movies} isLoggedIn={isLoggedIn}
            movies={isMovieSearch} onCardLike={handleCardLike} onCardDislike={handleCardDislike}
            isLoading={isLoading} isSearch={isSearch} setIsSearch={setIsSearch} onClick={handleSearchMoviesClick}
            isBigErr={isBigErr} setIsBigErr={setIsBigErr} setMoviesSearch={setIsMovieSearch} checkId={checkId}
            setIsLoading={setIsLoading} isLike={checkLikeMov} isMovieSave={isMovieSave} />

          <ProtectedRoute path={LINK_PROFILE} component={Profile} isLoggedIn={isLoggedIn}
            onRegister={handleSetUser} onClick={handleLogOff} isErr={isErrAuth} setIsErr={setIsErrAuth}
            isAddForm={isAddForm} />

          <ProtectedRoute path={LINK_MOVIES_SAVE} component={SavedMovies} isLoggedIn={isLoggedIn}
            onCardLike={handleCardLike} onCardDislike={handleCardDislike} checkId={checkId}
            isLoading={isLoading} isSearch={isSearchSave} setIsSearch={setIsSearchSave} setIsLoading={setIsLoading}
            isBigErr={isBigErr} setIsBigErr={setIsBigErr} isLike={checkLikeMov}
            setMovies={setIsMovieSave} moviesSave={isMovieSave}
            isMovieSearch={isMovieSaveSearch} setMovieSearch={setIsMovieSaveSearch}
            setIsSeeMovie={setIsSeeMovie} isSeeMovie={isSeeMovie} />

          <ProtectedRouteAuth path={LINK_SIGNUP} component={Register} onRegister={handleRegister}
            isErr={isErrAuth} setIsErr={setIsErrAuth} isAddForm={isAddForm} isLoggedIn={isLoggedIn} />

          <ProtectedRouteAuth path={LINK_SIGNIN} component={Login} onRegister={handleLogIn} isErr={isErrAuth}
            setIsErr={setIsErrAuth} isAddForm={isAddForm} isLoggedIn={isLoggedIn} />

          <ProtectedRoute path="*" component={NotFound} isLoggedIn={isLoggedIn} />

        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
