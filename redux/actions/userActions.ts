import axios from "axios";
import { CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../constants/userConstant";

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

export const clearErrors = () => async (dispatch: any) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}