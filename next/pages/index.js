import React from 'react';
import Link from 'next/link';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { logout } from '../store';
import withAuth from '../components/withAuth';

class Index extends React.Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.dispatch(logout());
  };

  render() {
    const { user } = this.props;
    const name = user ? `${user.email}` : 'Anonymous';

    return (
      <div>
        <h1>Hello {name}!</h1>
        <div>
          <Link href="/private">
            <a>Link to a private page</a>
          </Link>
        </div>
        <div>
          <Link href="/private-perm-required">
            <a>Link to a private page with specific permission requirement</a>
          </Link>
        </div>
        {user ? (
          <a href="/logout" onClick={this.handleLogout}>
            Logout
          </a>
        ) : (
          <div>
            <div>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </div>
            <div>
              <Link href="/register">
                <a>Register</a>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default compose(
  withAuth({ selector: () => true }),
  connect(mapStateToProps),
)(Index);
