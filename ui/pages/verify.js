import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
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
    const { errorMessage, user } = this.props;
    const email = user ? ` ${user.email}` : '';
    const loginLink = (
      <Link href="/login">
        <a>Login</a>
      </Link>
    );
    return (
      <div>
        {errorMessage ? (
          <h2>Verification Failed: {errorMessage}</h2>
        ) : (
          <div>
            <p>Successfully verified {email}.</p>
            <p>Please {loginLink} to continue.</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect()(Verify);
