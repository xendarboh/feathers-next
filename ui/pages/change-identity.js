import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AuthForm from '../components/authForm';
import Layout from '../components/Layout';
import withAuth from '../components/withAuth';
import {
  changeIdentity,
  selectUserEmail,
  selectUserIsAuthenticated,
} from '../store';

class ChangeIdentity extends React.Component {
  state = {
    email: '',
    errorMessage: '',
    password: '',
    success: false,
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = e => {
    const { changeIdentity } = this.props;
    const { email, password } = this.state;
    e.preventDefault();
    changeIdentity({
      identifyUser: { email: this.props.email },
      password,
      changes: { email },
    })
      .then(result => this.setState({ errorMessage: '', success: true }))
      .catch(err => this.setState({ errorMessage: err.message }));
  };

  render() {
    const { email, errorMessage, password, success } = this.state;

    return (
      <Layout>
        <h1>Change Email</h1>
        {!success ? (
          <AuthForm
            {...{
              button: 'Change Email',
              email,
              errorMessage,
              onChange: this.handleOnChange,
              onSubmit: this.handleOnSubmit,
              password,
            }}
          />
        ) : (
          <div>
            <p>The requested changes are pending verification.</p>
            <p>
              An email with further instruction has been sent to{' '}
              <i>{this.props.email}</i>.
            </p>
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
    { changeIdentity },
  ),
)(ChangeIdentity);
