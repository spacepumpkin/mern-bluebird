import { 
  RECEIVE_USER_LOGOUT
} from '../actions/session_actions';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (oldState = initialState, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_USER_LOGOUT:
      return Object.assign({}, oldState, { user: undefined });
    default:
      return oldState;
  }
}
