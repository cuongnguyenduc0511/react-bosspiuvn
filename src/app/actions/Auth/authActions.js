import axios from 'axios';
import { push } from 'react-router-redux';
import { authActions } from './authActionTypes';
import { requestActions } from '../Request/requestActionTypes';
import { commonActions } from '../Common/commonActionTypes';
const authApiUrl = 'http://localhost:3000/admin/user/login';
const authInstance = axios.create();

export const authenticate = (formValue) => dispatch => {

  dispatch({
    type: authActions.LOGIN_REQUEST
  })

  authInstance.post(authApiUrl, formValue).then(function (res) {
    if (res.data.token) {
      dispatch({
        type: authActions.LOGIN_SUCCESS,
        payload: res.data.token
      })
      setTimeout(function () {
        console.log('push');
        dispatch(push('/request'));
      }, 5000);
    }
  }).catch(function (error) {
    dispatch({
      type: authActions.LOGIN_FAIL,
      payload: (error.response && error.response.data) ? error.response.data : error.message
    })
  }).then(function () {
  });

}

export const getUserInformation = () => dispatch => {
  const getUserApiUrl = 'http://localhost:3000/admin/auth/user';
  const userToken = localStorage.getItem('authToken');
  authInstance.get(getUserApiUrl, {
    headers: {
      'Authorization': `Bearer ${userToken}`
    }
  }).then(function (res) {
    dispatch({
      type: authActions.GET_CURRENT_USER,
      payload: res.data
    })
  }).catch(function (error) {
    if (error.response.status === 401) {
      dispatch(signOut());
    }
  })
}

export const signOut = () => dispatch => {
  console.log('Sign Out');

  if (localStorage.getItem('authToken')) {
    localStorage.removeItem('authToken');
  }

  dispatch(resetAllState());

  dispatch(push('/login'));
}

export const resetAllState = () => dispatch => {
    
  const resetStateActions = [{
    type: requestActions.RESET_STATE
  }, {
    type: commonActions.RESET_STATE
  }, {
    type: authActions.RESET_STATE,
  }]
    
  resetStateActions.forEach(action => {
    dispatch(action);
  });
}
