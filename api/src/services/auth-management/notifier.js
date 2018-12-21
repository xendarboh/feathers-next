/* eslint-disable indent, no-console */
const path = require('path');
// const pug = require('pug');

// pug stub
const pug = {
  compileFile: path => vars => JSON.stringify({ path, vars }),
};

// inspiration:
// - https://github.com/codingfriend1/Feathers-Vue/blob/feathers-2/server/services/auth-management/notifier.js

module.exports = app => {
  const returnEmail = app.get('complaint_email') || process.env.COMPLAINT_EMAIL;

  function getLink(type, hash) {
    return 'http://localhost:3000/account/' + type + '?token=' + hash;
  }

  const sendEmail = email => {
    console.log('TODO sendEmail():', email);
    // return app
    //   .service('emails')
    //   .create(email)
    //   .then(function(result) {
    //     console.log('Sent email', result);
    //   })
    //   .catch(err => {
    //     console.log('Error sending email', err);
    //   });
  };

  return (type, user, notifierOptions) => {
    console.log(
      `-- Preparing email of ${type} for user="${user.email}" with options:`,
      notifierOptions,
    );
    var hashLink;
    var email;
    var emailAccountTemplatesPath = path.join(
      'somepath',
      'email-templates',
      'account',
    );
    var templatePath;
    var compiledHTML;

    switch (type) {
      // send another email with link for verifying user's email addr
      case 'resendVerifySignup':
        hashLink = getLink('verify', user.verifyToken);

        templatePath = path.join(emailAccountTemplatesPath, 'verify-email.pug');

        compiledHTML = pug.compileFile(templatePath)({
          logo: '',
          name: user.name || user.email,
          hashLink,
          returnEmail,
        });

        email = {
          from: process.env.GMAIL,
          to: user.email,
          subject: 'Confirm Signup',
          html: compiledHTML,
        };

        return sendEmail(email);

      case 'verifySignup': // inform that user's email is now confirmed
        hashLink = getLink('verify', user.verifyToken);

        templatePath = path.join(
          emailAccountTemplatesPath,
          'email-verified.pug',
        );

        compiledHTML = pug.compileFile(templatePath)({
          logo: '',
          name: user.name || user.email,
          hashLink,
          returnEmail,
        });

        email = {
          from: process.env.GMAIL,
          to: user.email,
          subject: 'Thank you, your email has been verified',
          html: compiledHTML,
        };

        return sendEmail(email);

      case 'sendResetPwd': // inform that user's email is now confirmed
        hashLink = getLink('reset', user.resetToken);

        templatePath = path.join(
          emailAccountTemplatesPath,
          'reset-password.pug',
        );

        compiledHTML = pug.compileFile(templatePath)({
          logo: '',
          name: user.name || user.email,
          hashLink,
          returnEmail,
        });

        email = {
          from: process.env.GMAIL,
          to: user.email,
          subject: 'Reset Password',
          html: compiledHTML,
        };

        return sendEmail(email);

      case 'resetPwd': // inform that user's email is now confirmed
        hashLink = getLink('reset', user.resetToken);

        templatePath = path.join(
          emailAccountTemplatesPath,
          'password-was-reset.pug',
        );

        compiledHTML = pug.compileFile(templatePath)({
          logo: '',
          name: user.name || user.email,
          hashLink,
          returnEmail,
        });

        email = {
          from: process.env.GMAIL,
          to: user.email,
          subject: 'Your password was reset',
          html: compiledHTML,
        };

        return sendEmail(email);

      case 'passwordChange':
        templatePath = path.join(
          emailAccountTemplatesPath,
          'password-change.pug',
        );

        compiledHTML = pug.compileFile(templatePath)({
          logo: '',
          name: user.name || user.email,
          returnEmail,
        });

        email = {
          from: process.env.GMAIL,
          to: user.email,
          subject: 'Your password was changed',
          html: compiledHTML,
        };

        return sendEmail(email);

      case 'identityChange':
        hashLink = getLink('verify', user.verifyToken);

        templatePath = path.join(
          emailAccountTemplatesPath,
          'identity-change.pug',
        );

        compiledHTML = pug.compileFile(templatePath)({
          logo: '',
          name: user.name || user.email,
          hashLink,
          returnEmail,
          changes: user.verifyChanges,
        });

        email = {
          from: process.env.GMAIL,
          to: user.email,
          subject: 'Your account was changed. Please verify the changes',
          html: compiledHTML,
        };

        return sendEmail(email);

      default:
        break;
    }
  };
};
