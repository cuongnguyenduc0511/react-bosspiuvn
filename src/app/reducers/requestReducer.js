import { requestActions } from '../actions/Request/requestActionTypes'

const INITIAL_STATE = {
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case requestActions.FETCH_REQUESTS_PENDING:
            delete state.error;
            return {
                ...state,
                isLoading: true
            }
        case requestActions.FETCH_REQUESTS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case requestActions.FETCH_REQUESTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                requestResult: action.payload
            }
        case requestActions.SAVE_SEARCH_VALUE:
            return {
                ...state,
                formValue: action.payload
            }
        case requestActions.DELETE_REQUEST_PENDING:
            return {
                ...state,
                deleteState: {
                    isDeletePending: true,
                    result: null
                }
            }
        case requestActions.DELETE_REQUEST_DONE:
            return {
                ...state,
                deleteState: {
                    isDeletePending: false,
                    result: action.payload
                }
            }
        case requestActions.EDIT_FETCH_REQUEST_PENDING:
            delete state.editRequestError;
            return {
                ...state,
                isRequestItemFetching: true,
            }
        case requestActions.EDIT_FETCH_REQUEST_FAIL:
            return {
                ...state,
                isRequestItemFetching: false,
                editRequestError: action.payload ? action.payload : undefined
            }
        case requestActions.EDIT_FETCH_REQUEST_DONE:
            return {
                ...state,
                isRequestItemFetching: false,
                editedRequest: action.payload
            }
        case requestActions.EDIT_CLEAR_REQUEST_ITEM:
            delete state.editedRequest;
            return state;
        case requestActions.RESET_STATE:
            return INITIAL_STATE;
        default:
            return state;
    }
}

