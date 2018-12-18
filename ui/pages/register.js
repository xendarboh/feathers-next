import React from 'react';
import { connect } from 'react-redux';
import { register } from '../store';
import AuthForm from '../components/authForm';

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
    e.preventDefault();
    this.props
      .dispatch(
        register({
          email: this.state.username,
          password: this.state.password,
        }),
      )
      .then(() => this.setState({ registered: true }))
      .catch(err => this.setState({ errorMessage: err.message }));
  };

  render() {
    const { errorMessage, password, username } = this.state;

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
