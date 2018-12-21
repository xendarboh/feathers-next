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
  AuthingComponent: () => null,

  // state selector for deciding if authentication is in process
  authingSelector: selectAuthIsLoading,

  // path to login page
  // failed auths are redirected here unless statusCode is set
  // a query param is used to redirect back to requested page upon login
  loginPath: '/account/login?go=',

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
    AuthingComponent,
    authingSelector,
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
            Location: `${loginPath}${req.originalUrl}`,
          });
          res.end();
        } else {
          Router.push(`${loginPath}${ctx.asPath}`);
        }
      }

      static async getInitialProps(ctx) {
        const { isServer, store, req, res } = ctx;

        // begin every server request unauthenticated because
        // api connections will be re-used for different users/requests
        if (isServer) await store.dispatch(feathers.auth.logout());

        // authenticate server on every client request
        // authenticate client only once
        if (isServer || !feathers.authed) {
          const accessToken = getCookie(FEATHERS_COOKIE, req);
          await store.dispatch(authenticate({ accessToken, res }));
          feathers.authed = true;
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

      // TODO: flash be gone!... (from AuthingComponent)
      // * without this, there is flash on client's first click of auth'd page
      // * with this, there is flash on client's first page load
      componentDidMount() {
        // authenticate client only once on initial request
        if (!feathers.authed) {
          const accessToken = getCookie(FEATHERS_COOKIE);
          this.props.dispatch(authenticate({ accessToken }));
          feathers.authed = true;
        }
      }

      render() {
        const { isAuthing, statusCode, props } = this.props;
        if (statusCode) {
          return <Error statusCode={statusCode} />;
        } else if (isAuthing && AuthingComponent !== false) {
          return <AuthingComponent />;
        } else {
          return <Component {...props} />;
        }
      }
    };

  const mapStateToProps = state => ({
    isAuthing: authingSelector(state),
  });

  return connect(mapStateToProps)(withAuth());
};
