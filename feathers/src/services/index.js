const users = require('./users/users.service.js');
const counters = require('./counters/counters.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(counters);
};
