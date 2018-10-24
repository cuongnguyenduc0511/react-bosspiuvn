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
        console.log('OK');
        dispatch({
            type: authActions.GET_CURRENT_USER,
            payload: res.data
        })
    }).catch(function (error) {
        console.log('NOT OK');
    })
}

