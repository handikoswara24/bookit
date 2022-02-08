import { combineReducers } from "redux";
import { bookedDatesReducer, bookingDetailsReducer, checkBookingReducer, myBookingReducer } from "./bookingReducers";
import { allRoomsReducer, newReviewReducer, roomDetailsReducer } from "./roomReducers";
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
    newReview: newReviewReducer
});

export default reducer;