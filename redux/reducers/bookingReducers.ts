import { BOOK_DATES_FAIL, BOOK_DATES_SUCCESS, CHECK_BOOKING_FAIL, CHECK_BOOKING_REQUEST, CHECK_BOOKING_RESET, CHECK_BOOKING_SUCCESS, CLEAR_ERRORS } from "../constants/bookingConstants"

export const checkBookingReducer = (state: any = { available: null }, action: any) => {
    switch (action.type) {
        case CHECK_BOOKING_REQUEST:
            return {
                loading: true
            }
        case CHECK_BOOKING_SUCCESS:
            return {
                loading: false,
                available: action.payload
            }
        case CHECK_BOOKING_RESET:
            return {
                loading: false,
                available: null
            }
        case CHECK_BOOKING_FAIL:
            return {
                loading: false,
                error: action.payload
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

export const bookedDatesReducer = (state: any = { booked: [] }, action: any) => {
    switch (action.type) {
        case BOOK_DATES_SUCCESS:
            return {
                loading: false,
                booked: action.payload
            }
        case BOOK_DATES_FAIL:
            return {
                loading: false,
                error: action.payload
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