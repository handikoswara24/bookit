import axios from "axios";
import { ADMIN_DETAILS_FAIL, ADMIN_DETAILS_REQUEST, ADMIN_DETAILS_SUCCESS, ADMIN_USERS_FAIL, ADMIN_USERS_REQUEST, ADMIN_USERS_SUCCESS, CLEAR_ERRORS, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "../constants/userConstant";

export const registerUser = (userData: any) => async (dispatch: any) => {
    try {
        dispatch({type: REGISTER_USER_REQUEST});

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };

        const { data } : any = await axios.post("/api/auth/register", userData, config);

        dispatch( {type: REGISTER_USER_SUCCESS, payload: data} );
    } catch (error : any) {
        dispatch({type: REGISTER_USER_FAIL, payload: error.response.data.message});
    }
} 

export const loadUser = () => async (dispatch: any) => {
    try {
        dispatch({type: LOAD_USER_REQUEST});

        const { data } : any = await axios.get("/api/me");

        dispatch( {type: LOAD_USER_SUCCESS, payload: data.user} );
    } catch (error : any) {
        dispatch({type: LOAD_USER_FAIL, payload: error.response.data.message});
    }
} 

export const updateProfile = (userData: any) => async (dispatch: any) => {
    try {
        dispatch({type: UPDATE_PROFILE_REQUEST});

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };

        const { data } : any = await axios.put("/api/me/update", userData, config);

        dispatch( {type: UPDATE_PROFILE_SUCCESS, payload: data.success} );
    } catch (error : any) {
        dispatch({type: UPDATE_PROFILE_FAIL, payload: error.response.data.message});
    }
} 

export const forgotPassword = (email: any) => async (dispatch: any) => {
    try {
        dispatch({type: FORGOT_PASSWORD_REQUEST});

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };

        const { data } : any = await axios.post("/api/password/forgot", email, config);

        dispatch( {type: FORGOT_PASSWORD_SUCCESS, payload: data.message} );
    } catch (error : any) {
        dispatch({type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message});
    }
} 

export const resetPassword = (token: any, passwords: any) => async (dispatch: any) => {
    try {
        dispatch({type: RESET_PASSWORD_REQUEST});

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };

        const { data } : any = await axios.put(`/api/password/reset/${token}`, passwords, config);

        dispatch( {type: RESET_PASSWORD_SUCCESS, payload: data.success } );
    } catch (error : any) {
        dispatch({type: RESET_PASSWORD_FAIL, payload: error.response.data.message});
    }
} 

export const getAdminUsers = () => async (dispatch: any) => {
    try {
        dispatch({type: ADMIN_USERS_REQUEST});

        const { data } : any = await axios.get(`/api/admin/users`);

        dispatch( {type: ADMIN_USERS_SUCCESS, payload: data.users } );
    } catch (error : any) {
        dispatch({type: ADMIN_USERS_FAIL, payload: error.response.data.message});
    }
} 

export const getUserDetails = (id : any) => async (dispatch: any) => {
    try {
        dispatch({type: ADMIN_DETAILS_REQUEST});

        const { data } : any = await axios.get(`/api/admin/users/${id}`);

        dispatch( {type: ADMIN_DETAILS_SUCCESS, payload: data.user } );
    } catch (error : any) {
        dispatch({type: ADMIN_DETAILS_FAIL, payload: error.response.data.message});
    }
} 

export const updateUser = (id: any, userData: any) => async (dispatch: any) => {
    try {
        dispatch({type: UPDATE_USER_REQUEST});

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };

        const { data } : any = await axios.put(`/api/admin/users/${id}`, userData, config);

        dispatch( {type: UPDATE_USER_SUCCESS, payload: data.success } );
    } catch (error : any) {
        dispatch({type: RESET_PASSWORD_FAIL, payload: error.response.data.message});
    }
} 

export const clearErrors = () => async (dispatch: any) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}