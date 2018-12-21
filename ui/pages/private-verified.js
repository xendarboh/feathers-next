import React from 'react';
import { compose } from 'redux';
import Layout from '../components/Layout';
import feathers from '../feathers';
import withAuth from '../components/withAuth';
import { selectUserIsVerified } from '../store';

class PrivateVerified extends React.Component {
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
        <h1>Private Page for verified users only</h1>
        <p>
          This page is only accessible by users that are <i>authenticated</i>{' '}
          and <i>verified</i>.
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
    selector: selectUserIsVerified,
    // statusCode: 403,
  }),
)(PrivateVerified);
