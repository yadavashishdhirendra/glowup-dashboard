import axios from 'axios';
import { GET_BOOKINGS_ERROR, GET_BOOKINGS_REQUEST, GET_BOOKINGS_SUCCESS, GET_CUSTOMER_CARE_BOOKINGS_ERROR, GET_CUSTOMER_CARE_BOOKINGS_REQUEST, GET_CUSTOMER_CARE_BOOKINGS_SUCCESS, GET_DATE_BOOKINGS_ERROR, GET_DATE_BOOKINGS_REQUEST, GET_DATE_BOOKINGS_SUCCESS, GET_DELETED_BOOKINGS_ERROR, GET_DELETED_BOOKINGS_REQUEST, GET_DELETED_BOOKINGS_SUCCESS } from '../constants/BookingsConstants';
import { ALL_USERS_ERROR, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, LOAD_USER_ERROR, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_ERROR, LOGOUT_SUCCESS } from '../constants/UserConstants';
export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        })
        const { data } = await axios.post(`/api/v2/login/user/bookings`, { email, password }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })
        localStorage.setItem("loggedIn", true)
    } catch (error) {
        dispatch({
            type: LOGIN_ERROR,
            payload: error.response.data.message
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_USER_REQUEST
        })
        const { data } = await axios.get(`/api/v2/web/user`)
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_ERROR,
            payload: error.response.data.message
        })
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        await axios.get('/api/v2/logout/user/bookings')
        dispatch({
            type: LOGOUT_SUCCESS,
        })
        localStorage.clear()
    } catch (error) {
        dispatch({
            type: LOGOUT_ERROR,
            payload: error.response.data.message
        })
    }
}

export const getAllBookings = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_BOOKINGS_REQUEST
        })
        const { data } = await axios.get(`/api/v2/allweb/user/bookings`)
        dispatch({
            type: GET_BOOKINGS_SUCCESS,
            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: GET_BOOKINGS_ERROR,
            payload: error.response.data.message
        })
    }
}
export const getDeletedBookingsAction = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_DELETED_BOOKINGS_REQUEST
        })
        const { data } = await axios.get(`/api/v2/deleted-bookings`)
        console.log(data)
        dispatch({
            type: GET_DELETED_BOOKINGS_SUCCESS,
            payload: data.bookings
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_DELETED_BOOKINGS_ERROR,
            payload: error.response.data.error
        })
    }
}
export const getTodaysBooking = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_CUSTOMER_CARE_BOOKINGS_REQUEST
        })
        const { data } = await axios.post(`/api/v2/date/bookings`)
        dispatch({
            type: GET_CUSTOMER_CARE_BOOKINGS_SUCCESS,
            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: GET_CUSTOMER_CARE_BOOKINGS_ERROR,
            payload: error.response.data.message
        })
    }
}
export const getDateBooking = (selectedDate) => async (dispatch) => {
    console.log(selectedDate)
    try {
        dispatch({
            type: GET_DATE_BOOKINGS_REQUEST
        })
        const { data } = await axios.post(`/api/v2/date/bookings`, { selectedDate })
        dispatch({
            type: GET_DATE_BOOKINGS_SUCCESS,
            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: GET_DATE_BOOKINGS_ERROR,
            payload: error.response.data.message
        })
    }
}
export const getAllUsersAction = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_USERS_REQUEST
        })
        const { data } = await axios.get(`/api/v2/all-users`)
        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })
    } catch (error) {
        dispatch({
            type: ALL_USERS_ERROR,
            payload: error.response.data.error
        })
    }
}