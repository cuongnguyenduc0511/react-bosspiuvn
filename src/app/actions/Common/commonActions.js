import axios from 'axios';
import { commonActions } from './commonActionTypes';
import { getCancelToken, removeCancelToken } from '../../helpers/axios-cancellation';
import { authHeader } from '../../helpers/auth-header';
import { signOut } from '../Auth/authActions';
const apiUrl = 'http://localhost:3000/api';

export const fetchCommonData = () => dispatch => {
    console.log('fetch common');
    
    const cancelTokenSource = getCancelToken();
    
    dispatch({
        type: commonActions.REQUEST_COMMON_DATA
    })

    axios.all([getStepchartTypes(cancelTokenSource), getStatusItems(cancelTokenSource), 
        getSongItems(cancelTokenSource), getUserItems(cancelTokenSource)])
        .then(axios.spread(function (stepchartTypeRes, statusRes, songRes, userRes) {
            // Both requests are now complete
            removeCancelToken(cancelTokenSource);

            dispatch({
                type: commonActions.GET_COMMON_DATA,
                payload: {
                    stepchartTypeItems: stepchartTypeRes.data,
                    statusItems: statusRes.data,
                    songItems: songRes.data,
                    userItems: userRes.data
                }
            })
        })).catch(error => {
            if (error.response && error.response.status === 401) {
                dispatch(signOut());
            }
        });
}

export const fetchStepchartTypes = () => dispatch => {
    const cancelTokenSource = getCancelToken();
    getStepchartTypes(cancelTokenSource).then(res => {
        removeCancelToken(cancelTokenSource);
    }).catch(error => {
        console.log('Error');
    });
}

export const fetchStatusItems = () => dispatch => {
    const cancelTokenSource = getCancelToken();
    getStatusItems(cancelTokenSource).then(res => {
        removeCancelToken(cancelTokenSource);
    }).catch(error => {
        console.log('Error');
    });
}

export const fetchSongs = () => dispatch => {
    const cancelTokenSource = getCancelToken();
    getSongItems(cancelTokenSource).then(res => {
        removeCancelToken(cancelTokenSource);
    }).catch(error => {
        console.log('Error');
    });
}

export const fetchStepchartLevels = (stepchartTypeValue) => dispatch => {
    switch(stepchartTypeValue) {
        case '': dispatch({
            type: commonActions.FETCH_ALL_STEPCHART_LEVELS
        }); break;
        case 'co-op': dispatch({
            type: commonActions.FETCH_COOP_STEPCHART_LEVELS
        }); break;
        default: dispatch({
            type: commonActions.FETCH_STANDARD_STEPCHART_LEVELS
        })
    }
}

function getStepchartTypes(cancelTokenSource) {
    return axios.get(`${apiUrl}/stepchart-types`, {
        cancelToken: cancelTokenSource.token
    });
}

function getStatusItems(cancelTokenSource) {
    return axios.get(`${apiUrl}/status`, {
        cancelToken: cancelTokenSource.token
    });
}

function getUserItems(cancelTokenSource) {
    const apiUrl = 'http://localhost:3000/admin';
    const userToken = localStorage.getItem('authToken');
    return axios.get(`${apiUrl}/users`, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        },
        cancelToken: cancelTokenSource.token
    });
}

function getSongItems(cancelTokenSource) {
    return axios.get(`${apiUrl}/songs-edit`, {
        cancelToken: cancelTokenSource.token
    });
}