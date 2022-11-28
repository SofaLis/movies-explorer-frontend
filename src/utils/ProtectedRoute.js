import React from "react";
import { Route, Redirect } from "react-router-dom";

import { LINK_MAIN } from './constant';

const ProtectedRoute = ({ component: Component, ...props }) => {

  return (
    <Route>
      {() =>
        props.isLoggedIn ? <Component {...props} /> : <Redirect to={LINK_MAIN} />
      }
    </Route>
  );
};

export default ProtectedRoute; 