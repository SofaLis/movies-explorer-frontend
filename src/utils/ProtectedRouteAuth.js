import React from "react";
import { Route, Redirect } from "react-router-dom";

import { LINK_MOVIES } from './constant';

const ProtectedRouteAuth = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        props.isLoggedIn ? <Redirect to={LINK_MOVIES} /> : <Component {...props} />
      }
    </Route>
  );
};

export default ProtectedRouteAuth; 