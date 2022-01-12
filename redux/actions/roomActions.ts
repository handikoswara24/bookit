import axios from "axios";
import { ALL_ROOMS_FAIL, ALL_ROOMS_SUCCESS, CLEAR_ERRORS, ROOM_DETAILS_FAIL, ROOM_DETAILS_SUCCESS } from "../constants/roomConstant";
import absoluteUrl from "next-absolute-url";
// Get all rooms
export const getRooms = (req: any, currentPage = 1, location ="", guests : any, category : any) => async (dispatch: any) => {
    try {
        const { origin } = absoluteUrl(req);

        let link = `${origin}/api/rooms?page=${currentPage}`;

        if(location){
            link += `&location=${location}`;
        }

        if(guests){
            link += `&guestCapacity=${guests}` 
        } 

        if(category){
            link += `&category=${category}`;
        }
        
        const { data } = await axios.get(link);

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

export const getRoomDetails = (req: any, id: any) => async (dispatch: any) => {
    try {
        const { origin } = absoluteUrl(req);
        const { data } = await axios.get(`${origin}/api/rooms/${id}`);

        dispatch({
            type: ROOM_DETAILS_SUCCESS,
            payload: data.room
        })
    } catch (error: any) {
        dispatch({
            type: ROOM_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch: any) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}