import { REGISTER_USER_REQUEST, REGISTER_USER_FAIL, REGISTER_USER_SUCCESS, CLEAR_ERRORS, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RESET, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, ADMIN_USERS_REQUEST, ADMIN_USERS_SUCCESS, ADMIN_USERS_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_RESET, ADMIN_DETAILS_REQUEST, ADMIN_DETAILS_SUCCESS, ADMIN_DETAILS_FAIL } from "../constants/userConstant";

export const authReducer = (state: any = { user: null }, action: any) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST: {
            return {
                loading: true
            }
        }
        case REGISTER_USER_SUCCESS: {
            return {
                loading: false,
                success: true
            }
        }

        case REGISTER_USER_FAIL: {
            return {
                loading: false,
                error: action.payload
            }
        }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default: {
            return state;
        }
    }
}

export const loadUserReducer = (state: any = { user: null, loading: true }, action: any) => {
    switch (action.type) {
        case LOAD_USER_REQUEST: {
            return {
                loading: true,
                isAuthenticated: false
            }
        }
        case LOAD_USER_SUCCESS: {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        }

        case LOAD_USER_FAIL: {
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload
            }
        }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default: {
            return state;
        }
    }
}

export const userReducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_USER_REQUEST:
        {
            return {
                loading: true
            }
        }

        case UPDATE_PROFILE_SUCCESS: 
        case UPDATE_USER_SUCCESS:
        {
            return {
                loading: false,
                isUpdated: action.payload
            }
        }

        case UPDATE_PROFILE_RESET: 
        case UPDATE_USER_RESET: 
        {
            return {
                loading: false,
                isUpdated: false
            }
        }

        case UPDATE_PROFILE_FAIL: 
        case UPDATE_USER_FAIL:
        {
            return {
                loading: false,
                error: action.payload
            }
        }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default: {
            return state;
        }
    }
}

export const forgotPasswordReducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST: {
            return {
                loading: true
            }
        }

        case FORGOT_PASSWORD_SUCCESS:
            {
                return {
                    loading: false,
                    message: action.payload
                }
            }
        case RESET_PASSWORD_SUCCESS:
            {
                return {
                    loading: false,
                    success: action.payload
                }
            }

        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL: {
            return {
                loading: false,
                error: action.payload
            }
        }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default: {
            return state;
        }
    }
}
export const allUsersReducer = (state: any = { users: [] }, action: any) => {
    switch (action.type) {
        case ADMIN_USERS_REQUEST: {
            return {
                loading: true,
            }
        }
        case ADMIN_USERS_SUCCESS: {
            return {
                loading: false,
                users: action.payload
            }
        }

        case ADMIN_USERS_FAIL: {
            return {
                loading: false,
                error: action.payload
            }
        }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default: {
            return state;
        }
    }
}

export const userDetailsReducer = (state : any = { user: {} }, action : any) => {
    switch (action.type) {

        case ADMIN_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ADMIN_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }

        case ADMIN_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}
