
// Hooks for service `authManagement`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common');
// !code: imports
// const auth = require('feathers-authentication');
const { authenticate } = require('@feathersjs/authentication').hooks;
// !end

// !<DEFAULT> code: used
// eslint-disable-next-line no-unused-vars
const { iff } = commonHooks;
// eslint-disable-next-line no-unused-vars
const { create, update, patch, validateCreate, validateUpdate, validatePatch } = require('./auth-management.validate');
// !end

// !code: init
// https://github.com/feathers-plus/feathers-authentication-management/blob/master/docs.md#service
const isAction = (...args) => hook => args.includes(hook.data.action);
// !end

let moduleExports = {
  before: {
    // !code: before
    all: [],
    find: [],
    get: [],
    create: [
      iff(isAction('passwordChange', 'identityChange'), authenticate('jwt')),
    ],
    update: [],
    patch: [],
    remove: []
    // !end
  },

  after: {
    // !<DEFAULT> code: after
    all: [],
    find: [],
    get: [],
    create: [],
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
