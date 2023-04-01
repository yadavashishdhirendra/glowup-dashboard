import axios from "axios"
import {
      CLEAR_ERRORS,
      GET_OFFER_IMAGES_ERROR,
      GET_OFFER_IMAGES_REQUEST,
      GET_OFFER_IMAGES_SUCCESS,

      ADD_OFFER_IMAGES_REQUEST,
      ADD_OFFER_IMAGES_SUCCESS,
      ADD_OFFER_IMAGES_ERROR,

      DELETE_OFFER_IMAGES_ERROR,
      DELETE_OFFER_IMAGES_REQUEST,
      DELETE_OFFER_IMAGES_SUCCESS
} from "../constants/OffersConstant"


export const fetchAllOffersImages = () => async (dispatch) => {
      try {
            dispatch({ type: GET_OFFER_IMAGES_REQUEST })
            const { data } = await axios.get("/api/v2/offer-images")
            dispatch({ type: GET_OFFER_IMAGES_SUCCESS, payload: data.images })
      } catch (error) {
            dispatch({ type: GET_OFFER_IMAGES_ERROR, payload: error.response.data.error })
            setTimeout(() => {
                  dispatch({ type: CLEAR_ERRORS })
            }, 5000)
      }
}
export const addOffersImages = (images) => async (dispatch) => {
      try {
            dispatch({ type: ADD_OFFER_IMAGES_REQUEST })
            const config = { headers: { "Content-Type": "multipart/form-data" } }
            const { data } = await axios.post("/api/v2/offer-images", { images }, config)
            dispatch({ type: ADD_OFFER_IMAGES_SUCCESS, payload: data.done })
      } catch (error) {
            console.log(error)
            dispatch({ type: ADD_OFFER_IMAGES_ERROR, payload: error.response.data.error })
            setTimeout(() => {
                  dispatch({ type: CLEAR_ERRORS })
            }, 5000)
      }
}
export const deleteOfferImageAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: DELETE_OFFER_IMAGES_REQUEST })
            const { data } = await axios.delete(`/api/v2/delete-offer/${id}`)
            console.log(data)
            dispatch({ type: DELETE_OFFER_IMAGES_SUCCESS, payload: data.deleted })
      } catch (error) {
            dispatch({ type: DELETE_OFFER_IMAGES_ERROR, payload: error.response.data.error })
            setTimeout(() => {
                  dispatch({ type: CLEAR_ERRORS })
            }, 5000)
      }
}