import React from 'react';
import feathers from '../feathers';
import { connect } from 'react-redux';
import { resendVerifySignup } from '../store';

class PendingVerification extends React.Component {
  state = {
    errorMessage: '',
    resent: false,
  };

  handleResendVerify = e => {
    const { email, resendVerifySignup } = this.props;
    e.preventDefault();
    resendVerifySignup({ email })
      .then(() => this.setState({ resent: true }))
      .catch(err => this.setState({ errorMessage: err.message }));
  };

  render() {
    const { errorMessage, resent } = this.state;
    const { isVerificationPending } = this.props;

    if (!isVerificationPending || resent) return null;

    return (
      <div>
        {errorMessage && <p>`Error: ${errorMessage}`</p>}
        <p>A verification link has been sent to your email account.</p>
        <p>
          Please follow the link within the email to complete the registration
          process or{' '}
          <a href="/verify" onClick={this.handleResendVerify}>
            resend verification link
          </a>
          .
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.auth.user ? state.auth.user.email : null,
  isVerificationPending:
    state.auth.user && state.auth.user.isVerified === false,
});

export default connect(
  mapStateToProps,
  { resendVerifySignup },
)(PendingVerification);
