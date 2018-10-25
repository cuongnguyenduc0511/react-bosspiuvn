import axios from 'axios';
import { push } from 'react-router-redux';
import { requestActions } from './requestActionTypes';
const requestApiUrl = 'http://localhost:3000/admin/requests';
import { authHeader } from '../../helpers/auth-header';
import { getAllUrlParams } from '../../modules/params';
import { getCancelToken, removeCancelToken } from '../../helpers/axios-cancellation';
const requestInstance = axios.create();

export const fetchRequests = (page = null, params = null) => dispatch => {
    fetchRequestData(params, page, dispatch);
}

export const saveSearchValue = (formValue) => dispatch => {
    dispatch({
        type: requestActions.SAVE_SEARCH_VALUE,
        payload: formValue
    })
}

let fetchRequestData = function (params, page, dispatch) {
    let urlParams = getParams(params, page);

    dispatch({
        type: requestActions.FETCH_REQUESTS_PENDING
    });

    let requestSource = getCancelToken();

    requestInstance.get(requestApiUrl, {
        params: urlParams,
        headers: authHeader(),
        cancelToken: requestSource.token
    }).then(res => {
        removeCancelToken(requestSource);
        dispatch({
            type: requestActions.FETCH_REQUESTS_SUCCESS,
            payload: res.data
        });
    }).catch(error => {
        dispatch({
            type: requestActions.FETCH_REQUESTS_FAIL,
            payload: error
        });
    });
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