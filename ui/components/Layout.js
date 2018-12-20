import { connect } from 'react-redux';
import NavigationLinks from '../components/NavigationLinks';
import VerifyMessage from '../components/VerifyMessage';

const printBool = x => (x ? 'yes' : 'no');

const Layout = ({ children, user, showVerifyMessage = true }) => (
  <div>
    <NavigationLinks />
    <hr />
    <h2>Hello {user.email}!</h2>
    {showVerifyMessage && user.isVerifyPending && <VerifyMessage />}
    <br />
    <br />
    <div>{children}</div>
    <br />
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
    </div>
  </div>
);

const mapStateToProps = state => ({
  user: {
    ...state.auth.user,
    email: state.auth.user ? state.auth.user.email : 'Anonymous',
    isAdmin: state.auth.user && state.auth.user.email === 'admin',
    isAuthenticated: state.auth.isSignedIn,
    isVerifyPending: state.auth.user && state.auth.user.isVerified === false,
  },
});

export default connect(mapStateToProps)(Layout);
