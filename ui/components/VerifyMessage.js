import React from 'react';
import { connect } from 'react-redux';
import { resendVerify, selectUserEmail } from '../store';

class VerifyMessage extends React.Component {
  state = {
    error: '',
    resent: false,
  };

  handleResendVerify = e => {
    const { email, resendVerify } = this.props;
    e.preventDefault();
    resendVerify({ identifyUser: { email } })
      .then(() => this.setState({ resent: true }))
      .catch(error => this.setState({ error }));
  };

  render() {
    const { error, resent } = this.state;
    const { email, showResendLinkOnly = false } = this.props;

    const resendLink = (
      <a href="/verify" onClick={this.handleResendVerify}>
        resend verification link
      </a>
    );

    if (resent) return null;
    if (error) return <p>Error: {error.message}</p>;
    if (showResendLinkOnly) return <p>{resendLink}</p>;

    return (
      <div>
        <p>
          A verification link has been emailed to <i>{email}</i>.
        </p>
        <p>Please follow the link to complete registration or {resendLink}.</p>
      </div>
    );
  }
}

export default connect(
  state => ({
    email: selectUserEmail(state),
  }),
  { resendVerify },
)(VerifyMessage);
