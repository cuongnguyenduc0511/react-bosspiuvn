import axios from 'axios';
import { commonActions } from './commonActionTypes';
import { getCancelToken, removeCancelToken } from '../../helpers/axios-cancellation';
const apiUrl = 'http://localhost:3000/api';

export const fetchCommonData = () => dispatch => {
    console.log('fetch common');
    
    const cancelTokenSource = getCancelToken();
    
    dispatch({
        type: commonActions.REQUEST_COMMON_DATA
    })

    axios.all([getStepchartTypes(cancelTokenSource), getStatusItems(cancelTokenSource)])
        .then(axios.spread(function (stepchartTypeRes, statusRes) {
            // Both requests are now complete
            removeCancelToken(cancelTokenSource);

            dispatch({
                type: commonActions.GET_COMMON_DATA,
                payload: {
                    stepchartTypeItems: stepchartTypeRes.data,
                    statusItems: statusRes.data,
                }
            })
        })).catch(error => {
            console.log(error);
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