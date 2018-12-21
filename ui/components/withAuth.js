import Error from 'next/error';
import React from 'react';
import Router from 'next/router';
import feathers from '../feathers';
import { connect } from 'react-redux';
import { getCookie } from '../lib/session';
import {
  FEATHERS_COOKIE,
  authenticate,
  logout,
  selectAuthIsLoading,
  selectUserIsVerified,
} from '../store';

/*
 * inspiration:
 * - https://github.com/leob/feathers-next/blob/master/client/src/components/withAuth.js
 * - https://mjrussell.github.io/redux-auth-wrapper/docs/API.html#connectedauthwrapper
 * - [connected HoC](https://github.com/reduxjs/react-redux/issues/837#issuecomment-431237853)
 */

const defaultArgs = {
  // alternative component shown while authenticating
  // set to false to disable, useful to not unmount some components while authenticating
  // default: don't render anything while authenticating
  AuthenticatingComponent: () => null,

  // state selector for deciding if authentication is in process
  authenticatingSelector: selectAuthIsLoading,

  // path to login page
  // redirect failed auths here unless statusCode is set
  loginPath: '/account/login',

  // state selector for deciding if user has permission to access page
  // default: require verification
  selector: selectUserIsVerified,

  // display an error page rather than redirect to login page
  statusCode: false,

  // React Component displayName wrapper
  wrapperDisplayName: 'withAuth',
};

export default args => Component => {
  const {
    AuthenticatingComponent,
    authenticatingSelector,
    loginPath,
    selector,
    statusCode,
    wrapperDisplayName,
  } = {
    ...defaultArgs,
    ...args,
  };

  const displayName = Component.displayName || Component.name || 'Component';

  const withAuth = () =>
    class extends React.Component {
      static displayName = `${wrapperDisplayName}(${displayName})`;

      static redirectToLogin(ctx) {
        const { isServer, req, res } = ctx;
        if (isServer) {
          res.writeHead(302, {
            Location: `${loginPath}?next=${req.originalUrl}`,
          });
          res.end();
        } else {
          Router.push(`${loginPath}?next=${ctx.asPath}`);
        }
      }

      static async getInitialProps(ctx) {
        const { isServer, store, req, res } = ctx;

        // begin every server request unauthenticated because
        // api connections will be re-used for different users/requests
        if (isServer) await store.dispatch(feathers.auth.logout());

        // authenticate server on every client request
        // authenticate client only once
        if (isServer || !feathers.authenticated) {
          const accessToken = getCookie(FEATHERS_COOKIE, req);
          await store.dispatch(authenticate({ accessToken, res }));
          feathers.authenticated = true;
        }

        if (!selector(store.getState()))
          return statusCode ? { statusCode } : this.redirectToLogin(ctx);

        return {
          props: {
            ...(Component.getInitialProps
              ? await Component.getInitialProps(ctx)
              : {}),
          },
        };
      }

      // TODO: flash be gone!... (from AuthenticatingComponent)
      // * without this, there is flash on client's first click of auth'd page
      // * with this, there is flash on client's first page load
      componentDidMount() {
        // authenticate client only once on initial request
        if (!feathers.authenticated) {
          const accessToken = getCookie(FEATHERS_COOKIE);
          this.props.dispatch(authenticate({ accessToken }));
          feathers.authenticated = true;
        }
      }

      render() {
        const { isAuthenticating, statusCode, props } = this.props;
        if (statusCode) {
          return <Error statusCode={statusCode} />;
        } else if (isAuthenticating && AuthenticatingComponent !== false) {
          return <AuthenticatingComponent />;
        } else {
          return <Component {...props} />;
        }
      }
    };

  const mapStateToProps = state => ({
    isAuthenticating: authenticatingSelector(state),
  });

  return connect(mapStateToProps)(withAuth());
};
