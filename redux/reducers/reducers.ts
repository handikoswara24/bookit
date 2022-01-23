import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailsReducer } from "./roomReducers";
import { authReducer, forgotPasswordReducer, loadUserReducer, userReducer } from "./userReducers";

const reducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    loadUser: loadUserReducer
});

export default reducer;