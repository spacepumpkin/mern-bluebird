import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact }) => {
  return (
    <Route path={path} exact={exact} render={ (props) => (
      !loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/tweets" />
      )
    )} />
  );
};

const Protected = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    )} />
  );
};

const mSP = (state) => ({
  loggedIn: state.session.isAuthenticated
});

export const AuthRoute = withRouter(connect(mSP)(Auth));
export const ProtectedRoute = withRouter(connect(mSP)(Protected));


