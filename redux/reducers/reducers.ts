import { combineReducers } from "redux";
import { bookedDatesReducer, checkBookingReducer } from "./bookingReducers";
import { allRoomsReducer, roomDetailsReducer } from "./roomReducers";
import { authReducer, forgotPasswordReducer, loadUserReducer, userReducer } from "./userReducers";

const reducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    loadUser: loadUserReducer,
    checkBooking: checkBookingReducer,
    bookedDates: bookedDatesReducer
});

export default reducer;