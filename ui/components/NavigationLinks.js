import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { logout } from '../store';

class NavigationLinks extends React.Component {
  handleLogout = e => {
    const { logout } = this.props;
    e.preventDefault();
    logout();
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>
        <div>
          <Link href="/private-authenticated">
            <a>private-authenticated</a>
          </Link>
          : authenticated users only (verification may be pending)
        </div>
        <div>
          <Link href="/private-verified">
            <a>private-verified</a>
          </Link>
          : verified users only
        </div>
        <div>
          <Link href="/private-admin">
            <a>private-admin</a>
          </Link>
          : admin only, hidden
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

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { logout },
)(NavigationLinks);
