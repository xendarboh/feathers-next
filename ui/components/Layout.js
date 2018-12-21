import { connect } from 'react-redux';
import NavigationLinks from '../components/NavigationLinks';
import VerifyMessage from '../components/VerifyMessage';
import {
  selectUserEmail,
  selectUserIsAdmin,
  selectUserIsAuthenticated,
  selectUserIsChangePending,
  selectUserIsVerified,
  selectUserIsVerifyPending,
} from '../store';

const printBool = x => (x ? 'yes' : 'no');

const Layout = ({ children, user, showVerifyMessage = true }) => (
  <div>
    <NavigationLinks />
    <hr />
    {showVerifyMessage && user.isVerifyPending && <VerifyMessage />}
    <div>{children}</div>
    <br />
    <br />
    <hr />
    <div>
      <div>
        <b>user:</b>
      </div>
      <div>email: {user.email}</div>
      <div>isAuthenticated: {printBool(user.isAuthenticated)}</div>
      <div>isVerified: {printBool(user.isVerified)}</div>
      <div>isAdmin: {printBool(user.isAdmin)}</div>
      <div>isVerifyPending: {printBool(user.isVerifyPending)}</div>
      <div>isChangePending: {printBool(user.isChangePending)}</div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  user: {
    email: selectUserEmail(state) || <i>undefined</i>,
    isAdmin: selectUserIsAdmin(state),
    isAuthenticated: selectUserIsAuthenticated(state),
    isChangePending: selectUserIsChangePending(state),
    isVerified: selectUserIsVerified(state),
    isVerifyPending: selectUserIsVerifyPending(state),
  },
});

export default connect(mapStateToProps)(Layout);
