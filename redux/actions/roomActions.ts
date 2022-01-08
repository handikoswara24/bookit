import axios from "axios";
import { ALL_ROOMS_FAIL, ALL_ROOMS_SUCCESS, CLEAR_ERRORS } from "../constants/roomConstant";
import absoluteUrl from "next-absolute-url";
// Get all rooms
export const getRooms = (req: any) => async (dispatch: any) => {
    try {
        const { origin } = absoluteUrl(req);
        const { data } = await axios.get(`${origin}/api/rooms`);

        dispatch({
            type: ALL_ROOMS_SUCCESS,
            payload: data
        })
    } catch (error: any) {
        dispatch({
            type: ALL_ROOMS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch: any) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}