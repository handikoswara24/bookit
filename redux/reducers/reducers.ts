import { combineReducers } from "redux";
import { bookedDatesReducer, bookingDetailsReducer, bookingReducer, bookingsReducer, checkBookingReducer, myBookingReducer } from "./bookingReducers";
import { allRoomsReducer, checkReviewReducer, newReviewReducer, newRoomReducer, reviewReducer, roomDetailsReducer, roomReviewReducer, updateRoomReducer } from "./roomReducers";
import { allUsersReducer, authReducer, forgotPasswordReducer, loadUserReducer, userDetailsReducer, userReducer } from "./userReducers";

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
    bookings : bookingsReducer,
    booking: bookingReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    roomReviews: roomReviewReducer,
    review: reviewReducer
});

export default reducer;