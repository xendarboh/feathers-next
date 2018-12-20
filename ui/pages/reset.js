import React from 'react';
import Link from 'next/link';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import NewPasswordForm from '../components/newPasswordForm';
import withAuth from '../components/withAuth';
import { resetPassword } from '../store';

const passwordMinLength = 6;
const tokenMinLength = 40;

class Reset extends React.Component {
  state = {
    errorMessage: '',
    password: '',
    success: false,
  };

  static async getInitialProps({ query }) {
    const { token } = query;
    return {
      isTokenError: !token || token.length < tokenMinLength,
      token,
    };
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = e => {
    const { resetPassword, token } = this.props;
    const { password } = this.state;

    e.preventDefault();

    if (password.length < passwordMinLength) {
      this.setState({
        errorMessage: `Password must have ${passwordMinLength} or more characters`,
      });
      return;
    }

    resetPassword({ token, password })
      .then(result => this.setState({ errorMessage: '', success: true }))
      .catch(err => this.setState({ errorMessage: err.message }));
  };

  render() {
    const { isTokenError, token } = this.props;
    const { errorMessage, password, success } = this.state;

    const loginLink = (
      <Link href="/login">
        <a>Log In</a>
      </Link>
    );

    const recoverLink = text => (
      <Link href="/recover">
        <a>{text}</a>
      </Link>
    );

    return (
      <Layout showVerifyMessage={false}>
        <h1>Reset Password</h1>
        <div>
          {isTokenError ? (
            <div>
              <p style={{ color: 'red' }}>Token Error</p>
              <p>Please {recoverLink('try again')}.</p>
            </div>
          ) : !success ? (
            <NewPasswordForm
              {...{
                errorMessage,
                onChange: this.handleOnChange,
                onSubmit: this.handleOnSubmit,
                password,
              }}
            />
          ) : (
            <div>
              <p>Successfully reset password.</p>
              <p>Please {loginLink} to continue.</p>
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

export default compose(
  withAuth({ selector: () => true }),
  connect(
    null,
    { resetPassword },
  ),
)(Reset);
