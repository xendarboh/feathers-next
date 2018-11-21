import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../store';
import AuthForm from '../components/authForm';

class Register extends Component {
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

  handleRegisterSubmit = e => {
    e.preventDefault();
    this.props
      .dispatch(
        register({
          email: this.state.username,
          password: this.state.password,
        }),
      )
      .catch(err => {
        console.log('Register Failed:', err);
        this.setState({ errorMessage: err.message });
      });
  };

  render() {
    const { username, password, errorMessage } = this.state;

    return (
      <div>
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
      </div>
    );
  }
}

export default connect()(Register);
