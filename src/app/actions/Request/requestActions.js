import axios from 'axios';
import { push } from 'react-router-redux';
import { requestActions } from './requestActionTypes';
const requestApiUrl = 'http://localhost:3000/admin/requests';
import { authHeader } from '../../helpers/auth-header';
import { getAllUrlParams } from '../../modules/params';
import { getCancelToken, removeCancelToken } from '../../helpers/axios-cancellation';
import { signOut } from '../Auth/authActions';
import swal from 'sweetalert';
const requestInstance = axios.create();

export const fetchRequests = (page = null, params = null) => dispatch => {
    fetchRequestData(params, page, dispatch);
}

export const deleteRequest = (deleted, context) => dispatch => {
    const deleteRequestApi = 'http://localhost:3000/admin/request/deleteDemo';

    dispatch({
        type: requestActions.DELETE_REQUEST_PENDING
    });

    let requestSource = getCancelToken();
    let swalOptions;

    console.log(deleted);

    requestInstance.delete(deleteRequestApi, {
        headers: authHeader(),
        data: { deleted: deleted },
        cancelToken: requestSource.token
    }).then(res => {
        removeCancelToken(requestSource);
        dispatch({
            type: requestActions.DELETE_REQUEST_DONE,
            payload: res.data
        });

        swalOptions = {
            title: res.data.message,
            icon: "success",
            button: "OK",
            closeOnClickOutside: false
        }

        const { requestResult } = context.props;
        
        const { currentPage, queryParams } = requestResult;

        swal(swalOptions).then(() => {
            dispatch(fetchRequests(currentPage, queryParams));
        });

    }).catch(error => {

        if (error.response && error.response.status === 401) {
            dispatch(signOut());
        } else {
            if (!axios.isCancel()) {
                dispatch({
                    type: requestActions.DELETE_REQUEST_DONE,
                    payload: error
                });

                swalOptions = {
                    title: error.response.data.message,
                    icon: "error",
                    button: "OK",
                    closeOnClickOutside: false
                }

                swal(swalOptions);
            }
        }

    }).then(() => {
        context.toggleDeleteModal();
    });
}

export const saveSearchValue = (formValue) => dispatch => {
    dispatch({
        type: requestActions.SAVE_SEARCH_VALUE,
        payload: formValue
    })
}

export const fetchRequestItem = (id) => dispatch => {
    let requestSource = getCancelToken();
    const requestApiUrl = `http://localhost:3000/admin/request/${id}`;
    
    dispatch({
        type: requestActions.EDIT_FETCH_REQUEST_PENDING
    });
    
    requestInstance.get(requestApiUrl, {
        headers: authHeader(),
        cancelToken: requestSource.token
    }).then(res => {
        removeCancelToken(requestSource);
        dispatch({
            type: requestActions.EDIT_FETCH_REQUEST_DONE,
            payload: res.data
        });
    }).catch(error => {
        if (error.response && error.response.status === 401) {
            dispatch(signOut());
        } else {
            if (!axios.isCancel()) {
                dispatch({
                    type: requestActions.EDIT_FETCH_REQUEST_FAIL,
                    payload: error
                });
            }
        }
    });
}

export const clearRequestItem = () => dispatch => {
    dispatch({
        type: requestActions.EDIT_CLEAR_REQUEST_ITEM
    })
}

let fetchRequestData = function (params, page, dispatch) {
    let urlParams = getParams(params, page);

    document.getElementById('master-checkbox').checked = false;
    let itemCheckboxes = document.getElementsByClassName('item-checkbox');
    for (let i = 0; i < itemCheckboxes.length; i++) {
        itemCheckboxes[i].checked = false;
    }

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
        if (error.response && error.response.status === 401) {
            dispatch(signOut());
        } else {
            if (!axios.isCancel()) {
                dispatch({
                    type: requestActions.FETCH_REQUESTS_FAIL,
                    payload: error
                });
            }
        }
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