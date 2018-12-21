import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { logout, selectUserIsAuthenticated } from '../store';

class NavigationLinks extends React.Component {
  handleLogout = e => {
    const { logout } = this.props;
    e.preventDefault();
    logout();
  };

  render() {
    const { userIsAuthenticated } = this.props;
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
        {userIsAuthenticated ? (
          <div>
            <div>
              <Link href="/change-password">
                <a>Change Password</a>
              </Link>
            </div>
            <div>
              <Link href="/change-identity">
                <a>Change Identity</a>
              </Link>
            </div>
            <div>
              <a href="/logout" onClick={this.handleLogout}>
                Logout
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <Link href="/login">
                <a>Log In</a>
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
  userIsAuthenticated: selectUserIsAuthenticated(state),
});

export default connect(
  mapStateToProps,
  { logout },
)(NavigationLinks);
