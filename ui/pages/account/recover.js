import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';
import AccountRecoveryForm from '../../components/accountRecoveryForm';
import { sendResetPassword } from '../../store';

class AccountRecovery extends React.Component {
  state = {
    email: '',
    errorMessage: '',
    success: false,
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value, errorMessage: '' });
  };

  handleOnSubmit = e => {
    const { sendResetPassword } = this.props;
    const { email } = this.state;
    e.preventDefault();
    sendResetPassword({ identifyUser: { email } })
      .then(() => this.setState({ errorMessage: '', success: true }))
      .catch(err => this.setState({ errorMessage: err.message }));
  };

  render() {
    const { email, errorMessage, success } = this.state;
    return (
      <Layout>
        <h1>Password Recovery</h1>
        {!success ? (
          <AccountRecoveryForm
            {...{
              email,
              errorMessage,
              onChange: this.handleOnChange,
              onSubmit: this.handleOnSubmit,
            }}
          />
        ) : (
          <div>
            An email with further instruction has been sent to <i>{email}</i>.
          </div>
        )}
      </Layout>
    );
  }
}

export default compose(
  connect(
    null,
    { sendResetPassword },
  ),
)(AccountRecovery);
