import { authActions } from '../actions/Auth/authActionTypes'

const INITIAL_STATE = {
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case authActions.LOGIN_REQUEST:
            delete state.error;
            delete state.success;
            return {
                ...state,
                isLoading: true,
            };
        case authActions.LOGIN_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case authActions.LOGIN_SUCCESS:
            localStorage.setItem('authToken', action.payload);
            return {
                ...state,
                isAuthenticated: true,
            };
        case authActions.GET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };
        case authActions.SIGN_OUT:
            return INITIAL_STATE
        default:
            return state;
    }
}

