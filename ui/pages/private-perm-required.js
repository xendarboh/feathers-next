import React from 'react';
import Link from 'next/link';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withAuth from '../components/withAuth';

class PrivatePermRequired extends React.Component {
  render() {
    const { user } = this.props;
    const name = user ? `${user.email}` : 'Anonymous';

    return (
      <div>
        <div>
          <h1>Hello {name}!</h1>
          <p>This content is for "admin" users only.</p>
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
  withAuth({
    hidden: true,
    selector: state =>
      state.auth.user !== null && state.auth.user.email === 'admin',
  }),
  connect(mapStateToProps),
)(PrivatePermRequired);
