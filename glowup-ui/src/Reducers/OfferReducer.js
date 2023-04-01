import {
      CLEAR_ERRORS,
      GET_OFFER_IMAGES_ERROR,
      GET_OFFER_IMAGES_REQUEST,
      GET_OFFER_IMAGES_SUCCESS,

      ADD_OFFER_IMAGES_REQUEST,
      ADD_OFFER_IMAGES_SUCCESS,
      ADD_OFFER_IMAGES_ERROR,
      DELETE_OFFER_IMAGES_REQUEST,
      DELETE_OFFER_IMAGES_SUCCESS,
      DELETE_OFFER_IMAGES_ERROR
} from "../constants/OffersConstant";

export const GetAllImagesReducer = (state = {}, action) => {
      switch (action.type) {
            case GET_OFFER_IMAGES_REQUEST:
                  return {
                        loading: true
                  }
            case GET_OFFER_IMAGES_SUCCESS:
                  return {
                        loading: false,
                        offers: action.payload
                  }
            case GET_OFFER_IMAGES_ERROR:
            case ADD_OFFER_IMAGES_ERROR:
                  return {
                        loading: false,
                        adding: false,
                        error: action.payload
                  }
            case ADD_OFFER_IMAGES_REQUEST:
                  return {
                        adding: true
                  }
            case ADD_OFFER_IMAGES_SUCCESS:
                  return {
                        adding: false,
                        done: action.payload
                  }
            case DELETE_OFFER_IMAGES_REQUEST:
                  return {
                        deleting: true
                  }
            case DELETE_OFFER_IMAGES_SUCCESS:
                  return {
                        deleting: false,
                        deleted: action.payload
                  }
            case DELETE_OFFER_IMAGES_ERROR:
                  return {
                        deleting: false,
                        error: action.payload
                  }
            case CLEAR_ERRORS:
                  return {
                        error: null,
                        loading: null,
                        adding: null
                  }
            default:
                  return state
      }
}