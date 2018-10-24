import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer';
import commonReducer from './commonReducer';
import requestReducer from './requestReducer';

export default combineReducers({
  // put reducer here,
  auth: authReducer,
  common: commonReducer,
  request: requestReducer,
  routing: routerReducer
});
