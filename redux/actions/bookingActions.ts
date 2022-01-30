import axios from "axios";
import { BOOK_DATES_FAIL, BOOK_DATES_SUCCESS, CHECK_BOOKING_FAIL, CHECK_BOOKING_REQUEST, CHECK_BOOKING_SUCCESS, CLEAR_ERRORS } from "../constants/bookingConstants";

export const checkBooking = (roomId: any, checkInDate: any, checkOutDate: any) => async (dispatch: any) => {
    try {
        dispatch({ type: CHECK_BOOKING_REQUEST });

        let link = `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;

        const { data }: any = await axios.get(link);

        dispatch({ type: CHECK_BOOKING_SUCCESS, payload: data.isAvailable });
    } catch (error: any) {
        dispatch({ type: CHECK_BOOKING_FAIL, payload: error.response.data.message });
    }
}

export const getBookedDates = (id: any) => async (dispatch: any) => {
    try {
        const { data }: any = await axios.get(`/api/bookings/check_booked_dates?roomId=${id}`);

        dispatch({ type: BOOK_DATES_SUCCESS, payload: data.bookedDates });
    } catch (error: any) {
        dispatch({ type: BOOK_DATES_FAIL, payload: error.response.data.message });
    }
}

export const clearErrors = () => async (dispatch: any) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}