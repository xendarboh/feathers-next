// Initializes the `authManagement` service on path `/auth-management`.
// (Can't be re-generated, yet... so use feathers-gen-specs.options.freeze)
const hooks = require('./auth-management.hooks');
const authManagement = require('feathers-authentication-management');
const notifier = require('./notifier');

module.exports = function (app) {
  const authManagementOptions = {
    path: 'auth-management',
    notifier: notifier(app),
  };

  app.configure(authManagement(authManagementOptions));

  // Get our initialized service so that we can register hooks
  const service = app.service('auth-management');

  service.hooks(hooks);
};
