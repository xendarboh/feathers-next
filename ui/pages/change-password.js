import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import NewPasswordForm from '../components/newPasswordForm';
import withAuth from '../components/withAuth';
import { validatePassword } from '../lib/validate';
import {
  changePassword,
  selectUserEmail,
  selectUserIsAuthenticated,
} from '../store';

class ChangePassword extends React.Component {
  state = {
    currentPassword: '',
    errorMessage: '',
    password: '',
    success: false,
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = e => {
    const { changePassword, email } = this.props;
    const { currentPassword, password } = this.state;

    e.preventDefault();

    const [errorMessage, isPasswordValid] = validatePassword(password);
    if (!isPasswordValid) {
      this.setState({ errorMessage: errorMessage ? errorMessage : '' });
      return;
    }

    changePassword({
      identifyUser: { email },
      currentPassword,
      password,
    })
      .then(result => this.setState({ errorMessage: '', success: true }))
      .catch(err => this.setState({ errorMessage: err.message }));
  };

  render() {
    const { currentPassword, errorMessage, password, success } = this.state;

    return (
      <Layout>
        <h1>Change Password</h1>
        {!success ? (
          <NewPasswordForm
            showCurrentPassword
            {...{
              button: 'Change Password',
              currentPassword,
              errorMessage,
              onChange: this.handleOnChange,
              onSubmit: this.handleOnSubmit,
              password,
            }}
          />
        ) : (
          <div>
            <p>Successfully changed password.</p>
          </div>
        )}
      </Layout>
    );
  }
}

export default compose(
  withAuth({
    selector: selectUserIsAuthenticated,
  }),
  connect(
    state => ({
      email: selectUserEmail(state),
    }),
    { changePassword },
  ),
)(ChangePassword);
