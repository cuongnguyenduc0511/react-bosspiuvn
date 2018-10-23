import { authActions } from '../actions/Auth/authActionTypes'

const INITIAL_STATE = {
    isAuthenticated: false
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
            return state;
        default:
            return state;
    }
}

