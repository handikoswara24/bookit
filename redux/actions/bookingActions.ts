import axios from "axios";
import absoluteUrl from "next-absolute-url";
import { BOOKING_DETAILS_FAIL, BOOKING_DETAILS_SUCCESS, BOOK_DATES_FAIL, BOOK_DATES_SUCCESS, CHECK_BOOKING_FAIL, CHECK_BOOKING_REQUEST, CHECK_BOOKING_SUCCESS, CLEAR_ERRORS, MY_BOOKINGS_FAIL, MY_BOOKINGS_SUCCESS } from "../constants/bookingConstants";

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

export const myBookings = (authCookie : any, req : any) => async (dispatch: any) => {
    try {
        const {origin} = absoluteUrl(req)

        const config = {
            headers: {
                cookie: authCookie
            }
        }
        const { data }: any = await axios.get(`${origin}/api/bookings/me`, config);

        dispatch({ type: MY_BOOKINGS_SUCCESS, payload: data.bookings });
    } catch (error: any) {
        dispatch({ type: MY_BOOKINGS_FAIL, payload: error.response.data.message });
    }
}

export const bookingDetails = (authCookie : any, req : any, id : any) => async (dispatch: any) => {
    try {
        const {origin} = absoluteUrl(req)

        const config = {
            headers: {
                cookie: authCookie
            }
        }
        const { data }: any = await axios.get(`${origin}/api/bookings/${id}`, config);

        dispatch({ type: BOOKING_DETAILS_SUCCESS, payload: data.booking });
    } catch (error: any) {
        dispatch({ type: BOOKING_DETAILS_FAIL, payload: error.response.data.message });
    }
}

export const clearErrors = () => async (dispatch: any) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}