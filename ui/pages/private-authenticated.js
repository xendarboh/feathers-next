import React from 'react';
import { compose } from 'redux';
import Layout from '../components/Layout';
import feathers from '../feathers';
import withAuth from '../components/withAuth';

class PrivateAuthenticated extends React.Component {
  static async getInitialProps({ store }) {
    try {
      const counters = await store.dispatch(feathers.counters.find());
      return { counterCount: counters.value.length };
    } catch (err) {
      console.log('counters.find Error:', err);
      return { errorMessage: err.message || err.name || '' };
    }
  }

  render() {
    const { counterCount, errorMessage } = this.props;

    return (
      <Layout>
        <h1>Private Page for authenticated users</h1>
        <p>
          This page is accessible by users that are <i>authenticated</i> but may
          not be <i>verified</i>.
        </p>
        <div>
          {errorMessage ? (
            <h2>Error: {errorMessage}</h2>
          ) : (
            <h2>You have {counterCount} counters.</h2>
          )}
        </div>
      </Layout>
    );
  }
}

export default compose(
  withAuth({
    selector: state => state.auth.isSignedIn,
  }),
)(PrivateAuthenticated);
