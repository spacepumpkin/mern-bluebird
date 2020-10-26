import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import LoginForm from './login_form';

const mSP = state => ({
  signedIn: state.session.isSignedIn,
  errors: state.errors.session
})

const mDP = dispatch => ({
  signup: user => dispatch(signup(user))
})

export default connect(mSP, mDP)(SignupForm);