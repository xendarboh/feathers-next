import { connect } from 'react-redux';
import NavigationLinks from '../components/NavigationLinks';
import VerifyMessage from '../components/VerifyMessage';
import {
  selectUserEmail,
  selectUserIsAdmin,
  selectUserIsAuthed,
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
      <div>isAuthed: {printBool(user.isAuthed)}</div>
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
    isAuthed: selectUserIsAuthed(state),
    isChangePending: selectUserIsChangePending(state),
    isVerified: selectUserIsVerified(state),
    isVerifyPending: selectUserIsVerifyPending(state),
  },
});

export default connect(mapStateToProps)(Layout);
