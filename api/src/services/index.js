
// Configure the Feathers services. (Can be re-generated.)
let authManagement = require('./auth-management/auth-management.service');
let counters = require('./counters/counters.service');
let users = require('./users/users.service');

// !code: imports // !end
// !code: init // !end

// eslint-disable-next-line no-unused-vars
let moduleExports = function (app) {
  app.configure(authManagement);
  app.configure(counters);
  app.configure(users);
  // !code: func_return // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
