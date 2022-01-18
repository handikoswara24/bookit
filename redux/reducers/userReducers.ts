import { REGISTER_USER_REQUEST, REGISTER_USER_FAIL, REGISTER_USER_SUCCESS, CLEAR_ERRORS, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL } from "../constants/userConstant";

export const authReducer = (state: any = { user: null }, action: any) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST: {
            return {
                loading: true
            }
        }
        case LOAD_USER_REQUEST : {
            return {
                loading: true,
                isAuthenticated: false
            }
        }
        case REGISTER_USER_SUCCESS: {
            return {
                loading: false,
                success: true
            }
        }
        case LOAD_USER_SUCCESS: {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        }
        case REGISTER_USER_FAIL: {
            return {
                loading: false,
                error: action.payload
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