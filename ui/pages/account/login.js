import React from 'react';
import Link from 'next/link';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AuthForm from '../../components/authForm';
import Layout from '../../components/Layout';
import withAuth from '../../components/withAuth';
import { login, selectAuthIsProcessing, selectUserIsAuthed } from '../../store';

class Login extends React.Component {
  state = {
    email: '',
    errorMessage: '',
    password: '',
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value, errorMessage: '' });
  };

  handleOnSubmit = e => {
    const { login } = this.props;
    const { email, password } = this.state;
    e.preventDefault();
    // login redirects page upon success
    login({ email, password }).catch(err =>
      this.setState({ errorMessage: err.message }),
    );
  };

  /*
   * Only show login form when user is not already authenticated.
   * Otherwise, only VerifyMessage is shown (from within Layout) when user is
   * not verified.
   */
  render() {
    const { email, errorMessage, password } = this.state;
    const { isProcessing, userIsAuthed } = this.props;

    console.log('isProcessing:', isProcessing);

    return (
      <Layout>
        {!userIsAuthed && (
          <div>
            <h1>Log In</h1>
            <AuthForm
              {...{
                button: 'Log In',
                email,
                errorMessage,
                isProcessing,
                onChange: this.handleOnChange,
                onSubmit: this.handleOnSubmit,
                password,
              }}
            />
            <Link href="/account/recover">
              <a>Forgot Password?</a>
            </Link>
          </div>
        )}
      </Layout>
    );
  }
}

export default compose(
  withAuth({
    AuthingComponent: false, // avoid unmounting this component while authing
    selector: () => true,
  }),
  connect(
    state => ({
      isProcessing: selectAuthIsProcessing(state),
      userIsAuthed: selectUserIsAuthed(state),
    }),
    { login },
  ),
)(Login);
