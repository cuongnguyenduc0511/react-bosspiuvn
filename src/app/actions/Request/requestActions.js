import axios from 'axios';
import { push } from 'react-router-redux';
import { requestActions } from './requestActionTypes';
const requestApiUrl = 'http://localhost:3000/admin/requests';
import { authHeader } from '../../helpers/auth-header';
const requestInstance = axios.create();
const CancelToken = axios.CancelToken;
export var requestSource;

export const fetchRequests = ({page = null, params = null} = {}) => dispatch => {
    fetchRequestData(params, page, dispatch);
}

let fetchRequestData = function (params, page, dispatch) {
    let urlParams = getParams(params, page);

    dispatch({
        type: requestActions.FETCH_REQUESTS_PENDING
    });

    requestSource = CancelToken.source();

    requestInstance.get(requestApiUrl, {
        params: urlParams,
        headers: authHeader(),
        cancelToken: requestSource.token
    }).then(res => {
        dispatch({
            type: requestActions.FETCH_REQUESTS_SUCCESS,
            payload: res.data
        });
    }).catch(error => {
        dispatch({
            type: requestActions.FETCH_REQUESTS_FAIL,
            payload: error
        });
    }).then(() => {
        requestSource = null;
    })
}

function getParams(params = null, page = null) {
    let urlParams = params ? jsonCopy(params) : {};

    if (typeof params === 'string') {
        urlParams = getAllUrlParams(params);
    }

    if (page) {
        urlParams.page = page;
    }

    return urlParams;
}

function jsonCopy(src) {
    return JSON.parse(JSON.stringify(src));
}