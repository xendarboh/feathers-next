import React from 'react';
import Link from 'next/link';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import VerifyMessage from '../components/VerifyMessage';
import withAuth from '../components/withAuth';
import { verify } from '../store';

class Verify extends React.Component {
  static async getInitialProps({ store, query }) {
    try {
      const { token } = query;
      const result = await store.dispatch(verify({ token }));
      return { user: result.value };
    } catch (err) {
      console.log('Registration Verification Failed:', err.message);
      return { errorMessage: err.message };
    }
  }

  render() {
    const { errorMessage, user, userIsAuthenticated } = this.props;

    const email = user ? user.email : 'unknown';
    const loginLink = (
      <Link href="/login">
        <a>Login</a>
      </Link>
    );

    return (
      <Layout showVerifyMessage={false}>
        {errorMessage ? (
          <div>
            <h2>Verification Failed: {errorMessage}</h2>
            <VerifyMessage showResendLinkOnly />
          </div>
        ) : (
          <div>
            <p>
              Successfully verified <i>{email}</i>.
            </p>
            {!userIsAuthenticated && <p>Please {loginLink} to continue.</p>}
          </div>
        )}
      </Layout>
    );
  }
}

export default compose(
  withAuth({ selector: () => true }),
  connect(state => ({
    userIsAuthenticated: state.auth.isSignedIn,
  })),
)(Verify);
