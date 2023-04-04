import {
    CLEAR_BOOKINGS_ERRORS,
    GET_BOOKINGS_ERROR,
    GET_BOOKINGS_REQUEST,
    GET_BOOKINGS_SUCCESS,

    GET_CUSTOMER_CARE_BOOKINGS_ERROR,
    GET_CUSTOMER_CARE_BOOKINGS_REQUEST,
    GET_CUSTOMER_CARE_BOOKINGS_SUCCESS,

    GET_DATE_BOOKINGS_ERROR,
    GET_DATE_BOOKINGS_REQUEST,
    GET_DATE_BOOKINGS_SUCCESS,

    GET_DELETED_BOOKINGS_ERROR,
    GET_DELETED_BOOKINGS_REQUEST,
    GET_DELETED_BOOKINGS_SUCCESS

} from "../constants/BookingsConstants";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,

    LOGOUT_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_ERROR,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_ERROR,

    ALL_USERS_ERROR,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    CLEAR_ERRORS
} from "../constants/UserConstants";
const initialState = {
    isAuthenticated: false,
};
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
            }
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                isAuthenticated: true
            }
        case LOGIN_ERROR:
        case LOGOUT_ERROR:
        case LOAD_USER_ERROR:
            return {
                loading: false,
                error: action.payload
            }

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false
            }
        case CLEAR_ERRORS:
            return {
                loading: false,
                error: null
            }
        default:
            return state
    }
}
export const allUsersReducers = (state = {}, action) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:
            return {
                fetching: true,
            }
        case ALL_USERS_SUCCESS:
            return {
                fetching: false,
                users: action.payload
            }
        case ALL_USERS_ERROR:
            return {
                fetching: null,
                err: action.payload
            }
        case CLEAR_ERRORS:
            return {
                fetching: false,
                err: null
            }
        default:
            return state
    }
}
export const bookingsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_BOOKINGS_REQUEST:
        case GET_CUSTOMER_CARE_BOOKINGS_REQUEST:
        case GET_DELETED_BOOKINGS_REQUEST:
            return {
                loading: true
            }
        case GET_BOOKINGS_SUCCESS:
        case GET_CUSTOMER_CARE_BOOKINGS_SUCCESS:
            return {
                loading: false,
                bookings: action.payload
            }
        case GET_DELETED_BOOKINGS_SUCCESS:
            return {
                loading: false,
                deleted: action.payload
            }
        case GET_BOOKINGS_ERROR:
        case GET_CUSTOMER_CARE_BOOKINGS_ERROR:
        case GET_DELETED_BOOKINGS_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_BOOKINGS_ERRORS:
            return {
                error: null
            }
        default:
            return state
    }
}

export const dateBookingsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_DATE_BOOKINGS_REQUEST:
            return {
                loading: true
            }
        case GET_DATE_BOOKINGS_SUCCESS:
            return {
                loading: false,
                bookings: action.payload
            }
        case GET_DATE_BOOKINGS_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_BOOKINGS_ERRORS:
            return {
                error: null
            }
        default:
            return state
    }
}

