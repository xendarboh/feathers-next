import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../store';
import AuthForm from '../components/authForm';

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLoginSubmit = e => {
    e.preventDefault();
    this.props
      .dispatch(
        login({
          email: this.state.username,
          password: this.state.password,
        }),
      )
      .catch(err => {
        console.log('Login Failed:', err);
        this.setState({ errorMessage: err.message });
      });
  };

  render() {
    const { username, password, errorMessage } = this.state;

    return (
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
    );
  }
}

export default connect()(Login);
