import axios from 'axios';
import { commonActions } from './commonActionTypes';
const apiUrl = 'http://localhost:3000/api';
const CancelToken = axios.CancelToken;
const commonInstance = axios.create();
var commonInstanceSources = []

export const fetchCommonData = () => dispatch => {
    console.log('fetch common');
    const cancelTokenSource = getCancelToken();
    dispatch({
        type: commonActions.REQUEST_COMMON_DATA
    })
    axios.all([getStepchartTypes(cancelTokenSource), getStatusItems(cancelTokenSource)])
        .then(axios.spread(function (stepchartTypeRes, statusRes) {
            // Both requests are now complete
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
        arrayRemove(commonInstanceSources, cancelTokenSource);
    }).catch(error => {
        console.log('Error');
    });
}

export const fetchStatusItems = () => dispatch => {
    const cancelTokenSource = getCancelToken();
    getStatusItems(cancelTokenSource).then(res => {
        arrayRemove(commonInstanceSources, cancelTokenSource);
    }).catch(error => {
        console.log('Error');
    });
}

function arrayRemove(array, value) {
    console.log('Delete Token');
    var index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
    console.log(array);
}

function getCancelToken() {
    const cancelTokenSource = CancelToken.source();
    commonInstanceSources.push(cancelTokenSource);
    return cancelTokenSource;
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

export function cancelAllRequests() {
    if (commonInstanceSources.length > 0) {
        commonInstanceSources.forEach(item => {
            item.cancel();
        });
        commonInstanceSources = [];
    }
}
