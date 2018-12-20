import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AuthForm from '../components/authForm';
import Layout from '../components/Layout';
import { register } from '../store';

class Register extends React.Component {
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

  handleRegisterSubmit = e => {
    const { register } = this.props;
    e.preventDefault();
    register({
      email: this.state.username,
      password: this.state.password,
    })
      .then(() => this.setState({ registered: true }))
      .catch(err => this.setState({ errorMessage: err.message }));
  };

  render() {
    const { errorMessage, password, username } = this.state;

    return (
      <Layout>
        Register please:
        <AuthForm
          {...{
            username,
            password,
            errorMessage,
            onChange: this.handleOnChange,
            onSubmit: this.handleRegisterSubmit,
          }}
        />
      </Layout>
    );
  }
}

export default compose(
  connect(
    null,
    { register },
  ),
)(Register);
