import { combineReducers } from 'redux';
import alert from './alert';
import slot from './slot';
import current from './current';

export default combineReducers({
  alert,
  slot,
  current,
});
