import axios from 'axios';
import { push } from 'react-router-redux';
import { authActions } from './authActionTypes';
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
            setTimeout(function() {
                console.log('push');
                dispatch(push('/song'));
            },5000);
        }
    }).catch(function (error) {
        dispatch({
            type: authActions.LOGIN_FAIL,
            payload: (error.response && error.response.data) ? error.response.data : error.message
        })
    }).then(function () {
    });

}

