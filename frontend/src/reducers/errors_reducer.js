import { combineReducers } from 'redux';
import SessionErrorsReducer from './sessions_errors_reducer';

export default combineReducers({
  session: SessionErrorsReducer
});

