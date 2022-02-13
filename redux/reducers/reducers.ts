import { combineReducers } from "redux";
import { bookedDatesReducer, bookingDetailsReducer, bookingsReducer, checkBookingReducer, myBookingReducer } from "./bookingReducers";
import { allRoomsReducer, checkReviewReducer, newReviewReducer, newRoomReducer, roomDetailsReducer, updateRoomReducer } from "./roomReducers";
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
    newRoom: newRoomReducer,
    updateRoom: updateRoomReducer,
    bookings : bookingsReducer
});

export default reducer;