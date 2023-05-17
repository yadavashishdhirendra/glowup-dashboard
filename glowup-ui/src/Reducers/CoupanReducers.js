import {
      ADD_SALON_OFFER_ERROR,
      ADD_SALON_OFFER_REQUEST,
      ADD_SALON_OFFER_RESET,
      ADD_SALON_OFFER_SUCCESS,
      CLEAR_COUPAN_ERRORS,

      CLEAR_ERRORS,

      CREATE_COUPAN_ERROR,
      CREATE_COUPAN_REQUEST,
      CREATE_COUPAN_RESET,
      CREATE_COUPAN_SUCCESS,

      DELETE_COUPAN_ERROR,
      DELETE_COUPAN_REQUEST,
      DELETE_COUPAN_RESET,
      DELETE_COUPAN_SUCCESS,

      EDIT_COUPAN_ERROR,

      EDIT_COUPAN_REQUEST,

      EDIT_COUPAN_RESET,

      EDIT_COUPAN_SUCCESS,

      FETCH_ALL_COUPANS_ERROR,
      FETCH_ALL_COUPANS_REQUEST,
      FETCH_ALL_COUPANS_SUCCESS,

      SINGLE_COUPANS_ERROR,
      SINGLE_COUPANS_REQUEST,
      SINGLE_COUPANS_SUCCESS,

} from "../constants/CoupanConstansts";

export const getSingleCoupanReducer = (state = {}, action) => {
      switch (action.type) {
            case SINGLE_COUPANS_REQUEST:
                  return {
                        loading: true
                  }
            case SINGLE_COUPANS_SUCCESS:
                  return {
                        loading: false,
                        coupan: action.payload,
                  }
            case SINGLE_COUPANS_ERROR:
                  return {
                        loading: false,
                        error: action.payload
                  }
            case CLEAR_COUPAN_ERRORS:
                  return {
                        ...state,
                        error: null
                  }
            default:
                  return state
      }
}
export const editCoupanReducer = (state = {}, action) => {
      switch (action.type) {
            case EDIT_COUPAN_REQUEST:
                  return {
                        updating: true
                  }
            case EDIT_COUPAN_SUCCESS:
                  return {
                        updating: false,
                        done: action.payload,
                  }
            case EDIT_COUPAN_ERROR:
                  return {
                        updating: false,
                        error: action.payload
                  }
            case EDIT_COUPAN_RESET:
                  return {
                        updating: null,
                        done: null,
                        error: null
                  }
            case CLEAR_COUPAN_ERRORS:
                  return {
                        ...state,
                        error: null
                  }
            default:
                  return state
      }
}
export const createCoupanReducer = (state = {}, action) => {
      switch (action.type) {
            case CREATE_COUPAN_REQUEST:
                  return {
                        creating: true
                  }
            case CREATE_COUPAN_SUCCESS:
                  return {
                        creating: false,
                        done: action.payload,
                  }
            case CREATE_COUPAN_ERROR:
                  return {
                        creating: false,
                        error: action.payload
                  }
            case CREATE_COUPAN_RESET:
                  return {
                        done: null,
                        error: null
                  }
            case CLEAR_COUPAN_ERRORS:
                  return {
                        ...state,
                        error: null
                  }

            default:
                  return state
      }
}
export const fetchAllCoupansReducer = (state = { coupans: [] }, action) => {
      switch (action.type) {
            case FETCH_ALL_COUPANS_REQUEST:
                  return {
                        loading: true
                  }
            case FETCH_ALL_COUPANS_SUCCESS:
                  return {
                        loading: false,
                        coupans: action.payload
                  }
            case FETCH_ALL_COUPANS_ERROR:
                  return {
                        loading: false,
                        error: action.payload
                  }
            case CLEAR_COUPAN_ERRORS:
                  return {
                        ...state,
                        error: null
                  }
            default:
                  return state
      }
}
export const deleteCoupanReducer = (state = {}, action) => {
      switch (action.type) {
            case DELETE_COUPAN_REQUEST:
                  return {
                        deleting: true
                  }
            case DELETE_COUPAN_SUCCESS:
                  return {
                        deleting: false,
                        deletedCoupan: action.payload
                  }
            case DELETE_COUPAN_ERROR:
                  return {
                        deleting: false,
                        error: action.payload
                  }
            case DELETE_COUPAN_RESET:
                  return {
                        deletedCoupan: null
                  }
            case CLEAR_COUPAN_ERRORS:
                  return {
                        ...state,
                        error: null
                  }
            default:
                  return state
      }
}
export const addOfferReducer = (state = {}, action) => {
      switch (action.type) {
            case ADD_SALON_OFFER_REQUEST:
                  return {
                        loading: true
                  }
            case ADD_SALON_OFFER_SUCCESS:
                  return {
                        loading: false,
                        done: action.payload
                  }
            case ADD_SALON_OFFER_ERROR:
                  return {
                        loading: null,
                        error: action.payload
                  }
            case CLEAR_ERRORS:
                  return {
                        loading: false,
                        error: null
                  }
            case ADD_SALON_OFFER_RESET:
                  return {
                        loading: null,
                        done: null,
                        error: null
                  }
            default:
                  return state
      }
}