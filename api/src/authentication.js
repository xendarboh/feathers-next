const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');


module.exports = function (app) {
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    // To avoid an additional request to get the user, send the user with the
    // response in the format that works with feathers-reduxify-authentication.
    // https://github.com/eddyystop/feathers-reduxify-authentication/issues/2#issuecomment-296403971
    after: {
      create: [
        context => {
          context.result.data = context.params.user;
          // Don't expose sensitive information.
          delete context.result.data.password;
        }
      ],
    },
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    }
  });
};
