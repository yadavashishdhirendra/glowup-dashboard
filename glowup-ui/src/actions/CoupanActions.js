import axios from "axios";
import { CREATE_COUPAN_SUCCESS, CREATE_COUPAN_REQUEST, CREATE_COUPAN_ERROR, CLEAR_COUPAN_ERRORS, FETCH_ALL_COUPANS_REQUEST, FETCH_ALL_COUPANS_SUCCESS, FETCH_ALL_COUPANS_ERROR, DELETE_COUPAN_REQUEST, DELETE_COUPAN_SUCCESS, DELETE_COUPAN_ERROR, ADD_SALON_OFFER_REQUEST, ADD_SALON_OFFER_SUCCESS, ADD_SALON_OFFER_RESET, CLEAR_ERRORS, SINGLE_COUPANS_REQUEST, SINGLE_COUPANS_SUCCESS, SINGLE_COUPANS_ERROR, EDIT_COUPAN_REQUEST, EDIT_COUPAN_SUCCESS, EDIT_COUPAN_ERROR } from "../constants/CoupanConstansts";

export const createCoupanAction = (
      name,
      description,
      maxDiscount,
      discountPercentage,
      category,
      valid_from,
      valid_till,
      min_amount,
      time_period,
      all_vendors,
      selected_vendors,
      usage_limit,
      gender
) => async (dispatch) => {
      try {
            dispatch({ type: CREATE_COUPAN_REQUEST })
            const { data } = await axios.post("api/v2/generate-coupan", {
                  name,
                  description,
                  maxDiscount,
                  discountPercentage,
                  category,
                  valid_from,
                  valid_till,
                  min_amount,
                  time_period,
                  all_vendors,
                  selected_vendors: all_vendors === "yes" ? [] : selected_vendors,
                  usage_limit,
                  gender
            })
            dispatch({ type: CREATE_COUPAN_SUCCESS, payload: data.success })
      } catch (error) {
            dispatch({ type: CREATE_COUPAN_ERROR, payload: error.response.data.err })
            setTimeout(() => {
                  dispatch({ type: CLEAR_COUPAN_ERRORS })
            }, 3000)
      }
}
export const fetchAllCoupansAction = () => async (dispatch) => {
      try {
            dispatch({ type: FETCH_ALL_COUPANS_REQUEST })
            const { data } = await axios.get("api/v2/coupans")
            console.log(data)
            dispatch({ type: FETCH_ALL_COUPANS_SUCCESS, payload: data.coupans })
      } catch (error) {
            console.log(error)
            dispatch({ type: FETCH_ALL_COUPANS_ERROR, payload: error.response.data.err })
            setTimeout(() => {
                  dispatch({ type: CLEAR_COUPAN_ERRORS })
            }, 3000)
      }
}
export const fetchSingleCoupanAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: SINGLE_COUPANS_REQUEST })
            const { data } = await axios.get(`/api/v2/single-coupan/${id}`)
            console.log(data)
            dispatch({ type: SINGLE_COUPANS_SUCCESS, payload: data.coupan })
      } catch (error) {
            dispatch({ type: SINGLE_COUPANS_ERROR, payload: error.response.data.err })
            setTimeout(() => {
                  dispatch({ type: CLEAR_COUPAN_ERRORS })
            }, 3000)
      }
}
export const editCoupanAction = (id, form) => async (dispatch) => {
      try {
            dispatch({ type: EDIT_COUPAN_REQUEST })
            const { data } = await axios.put(`/api/v2/edit-coupan/${id}`, form)
            console.log(data)
            dispatch({ type: EDIT_COUPAN_SUCCESS, payload: data.done })
      } catch (error) {
            dispatch({ type: EDIT_COUPAN_ERROR, payload: error.response.data.err })
            setTimeout(() => {
                  dispatch({ type: CLEAR_COUPAN_ERRORS })
            }, 3000)
      }
}
export const deleteCoupanAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: DELETE_COUPAN_REQUEST })
            const { data } = await axios.delete(`api/v2/delete-coupan/${id}`)
            dispatch({ type: DELETE_COUPAN_SUCCESS, payload: data.deletedCoupan })
      } catch (error) {
            dispatch({ type: DELETE_COUPAN_ERROR, payload: error.response.data.err })
            setTimeout(() => {
                  dispatch({ type: CLEAR_COUPAN_ERRORS })
            }, 3000)
      }
}
export const AddSalonOfferAction = (id, text) => async (dispatch) => {
      try {
            dispatch({ type: ADD_SALON_OFFER_REQUEST })
            const { data } = await axios.put(`/api/v2/offer/saloon/${id}`, { text })
            dispatch({ type: ADD_SALON_OFFER_SUCCESS, payload: data.done })
      } catch (error) {
            dispatch({ type: ADD_SALON_OFFER_RESET, payload: error.response.data.error })
            setTimeout(() => {
                  dispatch({ type: CLEAR_ERRORS })
            }, 3000)
      }
}
