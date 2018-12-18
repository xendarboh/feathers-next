import React from 'react';
import Link from 'next/link';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withAuth from '../components/withAuth';
import feathers from '../feathers';

class Private extends React.Component {
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
    const { counterCount, errorMessage, user } = this.props;
    const name = user ? `${user.email}` : 'Anonymous';

    return (
      <div>
        <div>
          <h1>Hello {name}!</h1>
          {errorMessage ? (
            <h2>Error: {errorMessage}</h2>
          ) : (
            <h2>You have {counterCount} counters.</h2>
          )}
          <p>This content is available for logged in users only.</p>
        </div>
        <div>
          <Link href="/">
            <a>Link to the home page</a>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default compose(
  withAuth(),
  connect(mapStateToProps),
)(Private);
