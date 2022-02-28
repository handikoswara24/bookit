import axios from "axios";
import { ADMIN_ROOMS_FAIL, ADMIN_ROOMS_REQUEST, ADMIN_ROOMS_SUCCESS, ALL_ROOMS_FAIL, ALL_ROOMS_SUCCESS, CLEAR_ERRORS, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_ROOM_FAIL, DELETE_ROOM_REQUEST, DELETE_ROOM_SUCCESS, GET_REVIEWS_FAIL, GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_ROOM_FAIL, NEW_ROOM_REQUEST, NEW_ROOM_SUCCESS, REVIEW_AVAILABILITY_FAIL, REVIEW_AVAILABILITY_REQUEST, REVIEW_AVAILABILITY_SUCCESS, ROOM_DETAILS_FAIL, ROOM_DETAILS_SUCCESS, UPDATE_ROOM_FAIL, UPDATE_ROOM_REQUEST, UPDATE_ROOM_SUCCESS } from "../constants/roomConstant";
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

export const getAdminRooms = () => async (dispatch: any) => {
    try {
        dispatch({type : ADMIN_ROOMS_REQUEST})

        const { data } = await axios.get(`/api/admin/rooms`);

        dispatch({
            type: ADMIN_ROOMS_SUCCESS,
            payload: data.rooms
        })
    } catch (error: any) {
        dispatch({
            type: ADMIN_ROOMS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newReview = (reviewData : any) => async (dispatch: any) => {
    try {

        dispatch({type: NEW_REVIEW_REQUEST});

        const config = {
            headers: {
                "Content-type" : "application/json"
            }
        }

        const { data } = await axios.put(`/api/reviews`, reviewData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })
    } catch (error: any) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteRoom = (id : any) => async (dispatch: any) => {
    try {

        dispatch({type: DELETE_ROOM_REQUEST});

        const { data } = await axios.delete(`/api/rooms/${id}`);

        dispatch({
            type: DELETE_ROOM_SUCCESS,
            payload: data.success
        })
    } catch (error: any) {
        dispatch({
            type: DELETE_ROOM_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newRoom = (roomData : any) => async (dispatch: any) => {
    try {

        dispatch({type: NEW_ROOM_REQUEST});

        const config = {
            headers: {
                "Content-type" : "application/json"
            }
        }

        const { data } = await axios.post(`/api/rooms`, roomData, config);

        dispatch({
            type: NEW_ROOM_SUCCESS,
            payload: data
        })
    } catch (error: any) {
        dispatch({
            type: NEW_ROOM_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateRoom = (id : any, roomData : any) => async (dispatch: any) => {
    try {

        dispatch({type: UPDATE_ROOM_REQUEST});

        const config = {
            headers: {
                "Content-type" : "application/json"
            }
        }

        const { data } = await axios.put(`/api/rooms/${id}`, roomData, config);

        dispatch({
            type: UPDATE_ROOM_SUCCESS,
            payload: data.success
        })
    } catch (error: any) {
        dispatch({
            type: UPDATE_ROOM_FAIL,
            payload: error.response.data.message
        })
    }
}

export const checkReviewAvailability = (roomId : any) => async (dispatch: any) => {
    try {

        dispatch({type: REVIEW_AVAILABILITY_REQUEST});

        const { data } = await axios.get(`/api/reviews/check_review_availability?roomId=${roomId}`);

        dispatch({
            type: REVIEW_AVAILABILITY_SUCCESS,
            payload: data.isReviewAvailable
        })
    } catch (error: any) {
        dispatch({
            type: REVIEW_AVAILABILITY_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getRoomReviews = (id : any) => async (dispatch: any) => {
    try {

        dispatch({type: GET_REVIEWS_REQUEST});

        const { data } = await axios.get(`/api/reviews/?id=${id}`);

        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.reviews
        })
    } catch (error: any) {
        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteReview = (id : any, roomId : any) => async (dispatch: any) => {
    try {

        dispatch({type: DELETE_REVIEW_REQUEST});

        const { data } = await axios.delete(`/api/reviews/?id=${id}&roomId=${roomId}`);

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })
    } catch (error: any) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch: any) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}