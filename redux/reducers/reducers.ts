import { combineReducers } from "redux";
import { bookedDatesReducer, bookingDetailsReducer, checkBookingReducer, myBookingReducer } from "./bookingReducers";
import { allRoomsReducer, checkReviewReducer, newReviewReducer, newRoomReducer, roomDetailsReducer } from "./roomReducers";
import { authReducer, forgotPasswordReducer, loadUserReducer, userReducer } from "./userReducers";

const reducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    loadUser: loadUserReducer,
    checkBooking: checkBookingReducer,
    bookedDates: bookedDatesReducer,
    myBooking: myBookingReducer,
    bookingDetails: bookingDetailsReducer,
    newReview: newReviewReducer,
    checkReview: checkReviewReducer,
    newRoom: newRoomReducer
});

export default reducer;