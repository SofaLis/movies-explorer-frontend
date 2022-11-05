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

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const history = useHistory();

  function handleLogIn(email, password) {
    setIsLoggedIn(true);
    history.push('/');
  }

  function handleRegister(name, email, password) {
    setIsLoggedIn(true);
    history.push('/');
  }

  function handleLogOff(name, email, password) {
    setIsLoggedIn(false);
    history.push('/');
  }

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main isLoggedIn={isLoggedIn} />
        </Route>
        <Route path="/movies">
          <Movies isLoggedIn={isLoggedIn} />
        </Route>
        <Route path="/signup">
          <Register onRegister={handleRegister} />
        </Route>
        <Route path="/signin">
          <Login onRegister={handleLogIn} />
        </Route>
        <Route path="/profile">
          <Profile onRegister={handleLogIn} onClick={handleLogOff} isLoggedIn={isLoggedIn} />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies isLoggedIn={isLoggedIn} />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
