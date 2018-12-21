import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AuthForm from '../../components/authForm';
import Layout from '../../components/Layout';
import { register, selectAuthIsProcessing } from '../../store';

class Register extends React.Component {
  state = {
    email: '',
    errorMessage: '',
    password: '',
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value, errorMessage: '' });
  };

  handleOnSubmit = e => {
    const { register } = this.props;
    const { email, password } = this.state;
    e.preventDefault();
    // register redirects page upon success
    register({ email, password }).catch(err =>
      this.setState({ errorMessage: err.message }),
    );
  };

  render() {
    const { email, errorMessage, password } = this.state;
    const { isProcessing } = this.props;

    return (
      <Layout>
        <h1>Register</h1>
        <AuthForm
          {...{
            button: 'Register',
            email,
            errorMessage,
            isProcessing,
            onChange: this.handleOnChange,
            onSubmit: this.handleOnSubmit,
            password,
          }}
        />
      </Layout>
    );
  }
}

export default compose(
  connect(
    state => ({
      isProcessing: selectAuthIsProcessing(state),
    }),
    { register },
  ),
)(Register);
