import Router from 'next/router';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import feathers from './feathers';
import { removeCookie, setCookie } from './lib/session';

// -- CONSTANTS
export const FEATHERS_COOKIE = 'feathers-jwt';

// -- INITIAL STORE
const exampleInitialState = {
  auth: {
    user: null,
  },
};

export const initStore = (initialState = exampleInitialState) => {
  return createStore(
    combineReducers({
      auth: feathers.auth.reducer,
      authManagement: feathers.authManagement.reducer,
      counters: feathers.counters.reducer,
      users: feathers.users.reducer,
    }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware, promiseMiddleware())),
  );
};

// -- ACTION TYPES
export const actionTypes = {
  EXAMPLE: 'EXAMPLE',
};

// -- REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.EXAMPLE: {
      return { ...state, example: action.data };
    }

    default:
      return state;
  }
};

// -- ACTIONS
// login requires a catch()
export const login = ({ email, password }) => dispatch =>
  dispatch(
    feathers.auth.authenticate({ strategy: 'local', email, password }),
  ).then(({ value: { accessToken } }) => {
    setCookie(FEATHERS_COOKIE, accessToken);
    Router.push('/');
  });

export const logout = () => dispatch => {
  removeCookie(FEATHERS_COOKIE);
  dispatch(feathers.auth.logout());
  Router.push('/');
};

// register requires a catch()
export const register = ({ email, password }) => dispatch =>
  dispatch(checkUnique({ email })).then(() =>
    dispatch(feathers.users.create({ email, password })).then(() =>
      dispatch(login({ email, password })),
    ),
  );

export const authenticate = ({ accessToken, res }) => dispatch =>
  dispatch(feathers.auth.authenticate({ strategy: 'jwt', accessToken }))
    .then(({ value: { accessToken } }) =>
      // set cookie in case token is reissued
      setCookie(FEATHERS_COOKIE, accessToken, res),
    )
    .catch(() => removeCookie(FEATHERS_COOKIE, res));

// requires a catch()
export const verify = ({ token }) => dispatch =>
  dispatch(
    feathers.authManagement.create({
      action: 'verifySignupLong',
      value: token,
    }),
  );

export const checkUnique = ({ email, ownId = null }) => dispatch =>
  dispatch(
    feathers.authManagement.create({
      action: 'checkUnique',
      value: { email },
      ownId,
      meta: { noErrMsg: false },
    }),
  );

export const resendVerifySignup = ({ email }) => dispatch =>
  dispatch(
    feathers.authManagement.create({
      action: 'resendVerifySignup',
      value: { email },
    }),
  );

export const sendResetPassword = ({ email }) => dispatch =>
  dispatch(
    feathers.authManagement.create({
      action: 'sendResetPwd',
      value: { email },
    }),
  );

export const resetPassword = ({ token, password }) => dispatch =>
  dispatch(
    feathers.authManagement.create({
      action: 'resetPwdLong',
      value: { token, password },
    }),
  );
