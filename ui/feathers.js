import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';
import reduxifyAuthentication from 'feathers-reduxify-authentication';
import reduxifyServices from 'feathers-redux';

// TODO get rid of this hardcoded API_ENDPOINT, make it configurable !
// https://github.com/zeit/next.js/tree/canary/examples/with-universal-configuration-runtime
const API_ENDPOINT = 'http://localhost:3030';

// "forceNew": https://github.com/feathersjs/authentication/issues/662
const socket = io(API_ENDPOINT, { transports: ['websocket'], forceNew: true });

// We don't configure JWT storage, the next.js app (which is separate from the
// Feathers backend) manages the JWT via a cookie
const authOptions = {};

export const services = {
  'auth-management': 'authManagement',
  counters: 'counters',
  users: 'users',
};

// TODO: https://github.com/eddyystop/feathers-starter-react-redux-login-roles/blob/master/client/feathers/index.js
// Convenience method to get status of feathers services, incl feathers-authentication
// export const getFeathersStatus = (servicesRootState, names = prioritizedListServices) =>
//   getServicesStatus(servicesRootState, names);

const client = feathers()
  .configure(socketio(socket))
  .configure(auth(authOptions));

export default {
  ...reduxifyServices(client, services),
  auth: reduxifyAuthentication(client, {
    // isUserAuthorized: user => user.isVerified, // user must be verified to authenticate
    // token: https://github.com/eddyystop/feathers-reduxify-authentication/issues/3
    token: 'accessToken', // TODO: consider not storing in state, use real-time instead?
  }),
  authed: false, // used to track client-side authentication initialization
};
