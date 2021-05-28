import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import NotFound from '../NotFound';

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)

  return (
    <Route {...props}>
      {(user) ? props.children  : <NotFound/>}
    </Route>
  )
};


export default ProtectedRoute;
