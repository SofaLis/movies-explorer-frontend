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
import ProtectedRoute from '../../utils/ProtectedRoute';

import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const history = useHistory();

  React.useEffect(() => {
    auth.getContent()
      .then((user) => {
        setIsLoggedIn(true);
        history.push("/");
        setCurrentUser(user);
      })
      .catch((err) => {
        history.push("/signin");
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>

          <Route exact path="/">
            <Main isLoggedIn={isLoggedIn} />
          </Route>

          <ProtectedRoute path="/movies" component={Movies} isLoggedIn={isLoggedIn} />

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
