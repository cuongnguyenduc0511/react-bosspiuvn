import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer';

export default combineReducers({
  // put reducer here,
  auth: authReducer,
  routing: routerReducer
});
