
// Hooks for service `users`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common');
const { authenticate } = require('@feathersjs/authentication').hooks;
// eslint-disable-next-line no-unused-vars
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
// !code: imports
const { addVerification, removeVerification } = require('feathers-authentication-management').hooks;
const notifier = require('../auth-management/notifier');
// !end

// !code: used
// eslint-disable-next-line no-unused-vars
const { disallow, iff, isProvider, preventChanges } = commonHooks;
// eslint-disable-next-line no-unused-vars
const { create, update, patch, validateCreate, validateUpdate, validatePatch } = require('./users.validate');
// !end

// !code: init // !end

let moduleExports = {
  before: {
    // Your hooks should include:
    //   find  : authenticate('jwt')
    //   get   : authenticate('jwt')
    //   create: hashPassword()
    //   update: hashPassword(), authenticate('jwt')
    //   patch : hashPassword(), authenticate('jwt')
    //   remove: authenticate('jwt')
    // !code: before
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [
      hashPassword(),
      addVerification('auth-management'),
    ],
    update: [
      disallow('external'),
      hashPassword(),
      authenticate('jwt'),
    ],
    patch: [
      // hashPassword() is managed by auth-management so remove from here
      authenticate('jwt'),
      iff(isProvider('external'), preventChanges(
        true,
        'isVerified',
        'resetExpires',
        'resetShortToken',
        'resetToken',
        'verifyChanges',
        'verifyExpires',
        'verifyShortToken',
        'verifyToken',
      )),
    ],
    remove: [ authenticate('jwt') ]
    // !end
  },

  after: {
    // Your hooks should include:
    //   all   : protect('password') /* Must always be the last hook */
    // !code: after
    all: [ protect('password') /* Must always be the last hook */ ],
    find: [],
    get: [],
    create: [
      context => notifier(context.app)('resendVerifySignup', context.result),
      removeVerification(),
    ],
    update: [],
    patch: [],
    remove: []
    // !end
  },

  error: {
    // !<DEFAULT> code: error
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
    // !end
  },
  // !code: moduleExports // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
