import { ADMIN_BOOKINGS_FAIL, ADMIN_BOOKINGS_REQUEST, ADMIN_BOOKINGS_SUCCESS, BOOKING_DETAILS_FAIL, BOOKING_DETAILS_SUCCESS, BOOK_DATES_FAIL, BOOK_DATES_SUCCESS, CHECK_BOOKING_FAIL, CHECK_BOOKING_REQUEST, CHECK_BOOKING_RESET, CHECK_BOOKING_SUCCESS, CLEAR_ERRORS, DELETE_BOOKING_FAIL, DELETE_BOOKING_REQUEST, DELETE_BOOKING_RESET, DELETE_BOOKING_SUCCESS, MY_BOOKINGS_FAIL, MY_BOOKINGS_SUCCESS } from "../constants/bookingConstants"

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

export const myBookingReducer = (state: any = { bookings: [] }, action: any) => {
    switch (action.type) {
        case MY_BOOKINGS_SUCCESS:
            return {
                loading: false,
                bookings: action.payload
            }
        case MY_BOOKINGS_FAIL:
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

export const bookingsReducer = (state: any = { bookings: [] }, action: any) => {
    switch (action.type) {
        case ADMIN_BOOKINGS_REQUEST:
            return {
                loading: true,
            }
        case ADMIN_BOOKINGS_SUCCESS :
            return {
                loading : false,
                bookings: action.payload
            }
        case ADMIN_BOOKINGS_FAIL:
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

export const bookingDetailsReducer = (state: any = { booking: {} }, action: any) => {
    switch (action.type) {
        case BOOKING_DETAILS_SUCCESS:
            return {
                loading: false,
                booking: action.payload
            }
        case BOOKING_DETAILS_FAIL:
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

export const bookingReducer = (state: any = { }, action: any) => {
    switch (action.type) {
        case DELETE_BOOKING_REQUEST:
            return {
                loading: true
            }
        case DELETE_BOOKING_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }
        case DELETE_BOOKING_RESET:
            return {
                loading: false,
                isDeleted: null
            }
        case DELETE_BOOKING_FAIL:
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