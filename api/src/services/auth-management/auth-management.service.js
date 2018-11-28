// Initializes the `authManagement` service on path `/auth-management`.
// (Can't be re-generated, yet... so use feathers-gen-specs.options.freeze)
const hooks = require('./auth-management.hooks');
const authManagement = require('feathers-authentication-management');
const notifier = require('./notifier');

// reference:
// - https://github.com/codingfriend1/Feathers-Vue/blob/feathers-2/server/services/auth-management/auth-management.service.js

let moduleExports = function (app) {
  const authManagementOptions = {
    path: 'auth-management',
    notifier: notifier(app),
  };

  app.configure(authManagement(authManagementOptions));

  // Get our initialized service so that we can register hooks
  const service = app.service('auth-management');

  service.hooks(hooks);
};

module.exports = moduleExports;
