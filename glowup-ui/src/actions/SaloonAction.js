import axios from "axios"
import { GET_BOOKINGS_ERROR, GET_BOOKINGS_REQUEST, GET_BOOKINGS_SUCCESS } from "../constants/BookingsConstants"
import {
      ACCOUNTS_ERROR,
      ACCOUNTS_REQUEST,
      ACCOUNTS_SUCCESS,

      ADD_IMAGES_ERROR,

      ADD_IMAGES_REQUEST,

      ADD_IMAGES_SUCCESS,

      ADD_NEW_SERVICES_ERROR,

      ADD_NEW_SERVICES_REQUEST,

      ADD_NEW_SERVICES_SUCCESS,

      CLEAR_SALOON_ERROR,

      DELETE_IMAGES_ERROR,

      DELETE_IMAGES_REQUEST,

      DELETE_IMAGES_SUCCESS,

      DELETE_SALON_DATA_ERROR,

      DELETE_SALON_DATA_REQUEST,

      DELETE_SALON_DATA_SUCCESS,

      FETCH_ALL_SALOONS_ERROR,
      FETCH_ALL_SALOONS_REQUEST,
      FETCH_ALL_SALOONS_SUCCESS,

      GET_SERVICES_ERROR,
      GET_SERVICES_REQUEST,
      GET_SERVICES_SUCCESS,

      GET_SINGLE_SALOON_ERROR,
      GET_SINGLE_SALOON_REQUEST,
      GET_SINGLE_SALOON_SUCCESS,

      UPDATE_SALOON_TAGS_ERROR,

      UPDATE_SALOON_TAGS_REQUEST,

      UPDATE_SALOON_TAGS_SUCCESS,

      UPDATE_SERVICES_ERROR,
      UPDATE_SERVICES_REQUEST,
      UPDATE_SERVICES_SUCCESS
} from "../constants/SaloonConstants"

export const fetchAllSaloonsAction = () => async (dispatch) => {
      try {
            dispatch({ type: FETCH_ALL_SALOONS_REQUEST })
            const { data } = await axios.get("/api/v2/saloons")
            dispatch({ type: FETCH_ALL_SALOONS_SUCCESS, payload: data.saloons })
      } catch (error) {
            dispatch({ type: FETCH_ALL_SALOONS_ERROR, payload: error.response.data.error })
      }
}
export const getServicesAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: GET_SERVICES_REQUEST })
            const { data } = await axios.get(`/api/v2/services/${id}`)
            dispatch({ type: GET_SERVICES_SUCCESS, payload: data.service })
      } catch (error) {
            dispatch({ type: GET_SERVICES_ERROR, payload: error.response.data.error })
      }
}
export const updateServicesAction = (field, value, ids, empIds) => async (dispatch) => {
      try {
            dispatch({ type: UPDATE_SERVICES_REQUEST })
            const { data } = await axios.patch("/api/v2/updateservices", { field, value: empIds.length ? empIds : value, ids, empIds })
            dispatch({ type: UPDATE_SERVICES_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: UPDATE_SERVICES_ERROR, payload: error.response.data.error })
      }
}
export const accountsAction = (start, end) => async (dispatch) => {
      try {
            console.log(start, end)
            dispatch({ type: ACCOUNTS_REQUEST })
            const { data } = await axios.post("/api/v2/account", { start: start, end: end })
            dispatch({ type: ACCOUNTS_SUCCESS, payload: data.bookings })
      } catch (error) {
            dispatch({ type: ACCOUNTS_ERROR, payload: error.response.data.error })
      }
}
export const getAllBookingsOfSaloon = (id) => async (dispatch) => {
      try {
            dispatch({
                  type: GET_BOOKINGS_REQUEST
            })
            const { data } = await axios.get(`/api/v2/bookings/${id}`)
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
export const fetchSingleSaloon = (id) => async (dispatch) => {
      try {
            dispatch({
                  type: GET_SINGLE_SALOON_REQUEST
            })
            const { data } = await axios.get(`/api/v2/saloon/${id}`)
            dispatch({
                  type: GET_SINGLE_SALOON_SUCCESS,
                  payload: data.saloon
            })
      } catch (error) {
            dispatch({
                  type: GET_SINGLE_SALOON_ERROR,
                  payload: error.response.data.message
            })
      }
}
export const updateSaloonTags = (action, ids, values) => async (dispatch) => {
      try {
            dispatch({
                  type: UPDATE_SALOON_TAGS_REQUEST
            })
            const { data } = await axios.put(`/api/v2/tags-saloon`, { action, ids, values })
            dispatch({
                  type: UPDATE_SALOON_TAGS_SUCCESS,
                  payload: data.response
            })
      } catch (error) {
            dispatch({
                  type: UPDATE_SALOON_TAGS_ERROR,
                  payload: error.response.data.message
            })
      }
}
export const addNewServicesAction = (id, file) => async (dispatch) => {
      try {
            dispatch({ type: ADD_NEW_SERVICES_REQUEST })
            const config = { headers: { "Content-Type": "multipart/form-data" } }
            const { data } = await axios.post(`/api/v2/add-services/${id}`, { file }, config)
            dispatch({ type: ADD_NEW_SERVICES_SUCCESS, payload: data.response })
      } catch (error) {
            dispatch({ type: ADD_NEW_SERVICES_ERROR, payload: error.response.data.error })
      }
}
export const addSaloonImages = (id, file) => async (dispatch) => {
      console.log(file)
      try {
            dispatch({ type: ADD_IMAGES_REQUEST })
            const config = { headers: { "Content-Type": "multipart/form-data" } }
            const { data } = await axios.post(`/api/v2/new-images/${id}`, { file }, config)
            dispatch({ type: ADD_IMAGES_SUCCESS, payload: data.uploaded })
      } catch (error) {
            console.log(error)
            dispatch({ type: ADD_IMAGES_ERROR, payload: error.response.data.error })
      }
}
export const deleteSaloonImages = (owner, action, public_id) => async (dispatch) => {
      try {
            console.log(action)
            dispatch({ type: DELETE_IMAGES_REQUEST })
            const { data } = await axios.put(`/api/v2/delete-images?owner=${owner}&id=${public_id}`, { action })
            dispatch({ type: DELETE_IMAGES_SUCCESS, payload: data.deleted })
      } catch (error) {
            dispatch({ type: DELETE_IMAGES_ERROR, payload: error.response.data.error })
      }
}
export const deleteSalonDataAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: DELETE_SALON_DATA_REQUEST })
            const { data } = await axios.delete(`/api/v2/saloon/${id}`)
            dispatch({ type: DELETE_SALON_DATA_SUCCESS, payload: data.deleted })
      } catch (error) {
            dispatch({ type: DELETE_SALON_DATA_ERROR, payload: error.response.data.error })
            setTimeout(() => {
                  dispatch({ type: CLEAR_SALOON_ERROR })
            }, 5000)
      }
}