import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AuthForm from '../components/authForm';
import Layout from '../components/Layout';
import withAuth from '../components/withAuth';
import { login } from '../store';

class Login extends React.Component {
  state = {
    errorMessage: '',
    password: '',
    username: '',
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLoginSubmit = e => {
    const { login } = this.props;
    e.preventDefault();
    login({
      email: this.state.username,
      password: this.state.password,
    }).catch(err => {
      console.log('Login Failed:', err);
      this.setState({ errorMessage: err.message });
    });
  };

  /*
   * Only render login form when user is not already authenticated.
   * Otherwise, PendingVerification reminder is rendered (from within Layout).
   * A page requiring verification is the only reason an authenticated user
   * should see this.
   */
  render() {
    const { errorMessage, password, username } = this.state;
    const { userIsAuthenticated } = this.props;

    return (
      <Layout>
        {!userIsAuthenticated && (
          <div>
            Log in please:
            <AuthForm
              {...{
                username,
                password,
                errorMessage,
                onChange: this.handleOnChange,
                onSubmit: this.handleLoginSubmit,
              }}
            />
          </div>
        )}
      </Layout>
    );
  }
}

export default compose(
  withAuth({ selector: () => true }),
  connect(
    state => ({
      userIsAuthenticated: state.auth.isSignedIn,
    }),
    { login },
  ),
)(Login);
