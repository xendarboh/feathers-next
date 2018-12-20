import Error from 'next/error';
import React from 'react';
import Router from 'next/router';
import feathers from '../feathers';
import { authenticate, logout, FEATHERS_COOKIE } from '../store';
import { connect } from 'react-redux';
import { getCookie } from '../lib/session';

/*
 * inspiration:
 * - https://github.com/leob/feathers-next/blob/master/client/src/components/withAuth.js
 * - https://mjrussell.github.io/redux-auth-wrapper/docs/API.html#connectedauthwrapper
 * - [connected HoC](https://github.com/reduxjs/react-redux/issues/837#issuecomment-431237853)
 */

const defaultArgs = {
  // alternative component shown while authenticating
  // default: don't render anything while authenticating
  // set to false to disable
  AuthenticatingComponent: () => null,
  authenticatingSelector: state => state.auth.isLoading,
  // selector: state => state.auth.isSignedIn, // authenticatedSelector
  selector: state => state.auth.user && state.auth.user.isVerified,
  // display an error page  rather than redirecting to login page
  statusCode: false,
  wrapperDisplayName: 'withAuth',
};

export default args => Component => {
  const {
    AuthenticatingComponent,
    authenticatingSelector,
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
          res.writeHead(302, { Location: `/login?next=${req.originalUrl}` });
          res.end();
        } else {
          Router.push(`/login?next=${ctx.asPath}`);
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
      // * without this, there is flash on first click of auth'd page
      // * with this, there is flash on first page load
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
    // isAuthenticated: selector(state),
    isAuthenticating: authenticatingSelector(state),
  });

  return connect(mapStateToProps)(withAuth());
};
