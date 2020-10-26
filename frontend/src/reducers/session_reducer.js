import { 
  RECEIVE_USER_LOGOUT,
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_SIGN_IN
} from '../actions/session_actions';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (oldState = initialState, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_USER_LOGOUT:
      return Object.assign({}, oldState, { 
        isAuthenticated: false,
        user: undefined });
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, oldState, { 
        isAuthenticated: !!action.currentUser, 
        user: action.currentUser });
    case RECEIVE_USER_SIGN_IN:
      return Object.assign({}, oldState, { 
        isSignedIn: true });
    default:
      return oldState;
  }
}
