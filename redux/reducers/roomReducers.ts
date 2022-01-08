import { ALL_ROOMS_FAIL, ALL_ROOMS_SUCCESS, CLEAR_ERRORS } from "../constants/roomConstant";

export const allRoomsReducer = (state : any = { rooms : []}, action : any ) => {
    switch (action.type) {
        case ALL_ROOMS_SUCCESS:
            return {
                roomsCount : action.payload.roomsCount,
                resPerPage : action.payload.roomsCount,
                filteredRoomsCount : action.payload.filteredRoomsCount,
                rooms : action.payload.rooms
            }
        case ALL_ROOMS_FAIL:
            return {
                error : action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}