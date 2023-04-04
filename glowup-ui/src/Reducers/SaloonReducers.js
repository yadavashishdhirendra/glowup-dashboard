import {
      ACCOUNTS_ERROR,
      ACCOUNTS_REQUEST,
      ACCOUNTS_SUCCESS,

      FETCH_ALL_SALOONS_ERROR,
      FETCH_ALL_SALOONS_REQUEST,
      FETCH_ALL_SALOONS_SUCCESS,

      GET_SERVICES_ERROR,
      GET_SERVICES_REQUEST,
      GET_SERVICES_SUCCESS,

      GET_SINGLE_SALOON_ERROR,
      GET_SINGLE_SALOON_REQUEST,
      GET_SINGLE_SALOON_SUCCESS,

      UPDATE_SERVICES_ERROR,
      UPDATE_SERVICES_REQUEST,
      UPDATE_SERVICES_RESET,
      UPDATE_SERVICES_SUCCESS,

      UPDATE_SALOON_TAGS_REQUEST,
      UPDATE_SALOON_TAGS_SUCCESS,
      UPDATE_SALOON_TAGS_ERROR,

      CLEAR_SALOON_ERROR,
      ADD_NEW_SERVICES_REQUEST,
      ADD_NEW_SERVICES_SUCCESS,
      ADD_NEW_SERVICES_ERROR,

      ADD_IMAGES_REQUEST,
      ADD_IMAGES_SUCCESS,
      ADD_IMAGES_ERROR,

      DELETE_IMAGES_REQUEST,
      DELETE_IMAGES_SUCCESS,
      DELETE_IMAGES_ERROR,
      DELETE_IMAGES_RESET,

      DELETE_SALON_DATA_REQUEST,
      DELETE_SALON_DATA_SUCCESS,
      DELETE_SALON_DATA_ERROR,
      DELETE_SALON_DATA_RESET,

      ADD_IMAGES_RESET,
      ADD_NEW_SERVICES_RESET,
      UPDATE_SALOON_TAGS_RESET

} from "../constants/SaloonConstants";
let initialState = {
      saloons: []
}
export const fetchAllSaloonsReducer = (state = initialState, action) => {
      switch (action.type) {
            case FETCH_ALL_SALOONS_REQUEST:
            case ACCOUNTS_REQUEST:
                  return {
                        loading: true
                  }
            case FETCH_ALL_SALOONS_SUCCESS:
            case ACCOUNTS_SUCCESS:
                  return {
                        loading: false,
                        saloons: action.payload
                  }
            case FETCH_ALL_SALOONS_ERROR:
            case ACCOUNTS_ERROR:
                  return {
                        loading: false,
                        error: action.payload
                  }
            default:
                  return state
      }
}
export const getSingleSaloonReducer = (state = {}, action) => {
      switch (action.type) {
            case GET_SINGLE_SALOON_REQUEST:
                  return {
                        loading: true
                  }
            case GET_SINGLE_SALOON_SUCCESS:
                  return {
                        loading: false,
                        saloon: action.payload
                  }
            case GET_SINGLE_SALOON_ERROR:
                  return {
                        loading: false,
                        error: action.payload
                  }
            default:
                  return state
      }
}
export const getServicesReducer = (state = {}, action) => {
      switch (action.type) {
            case GET_SERVICES_REQUEST:
                  return {
                        loading: true
                  }
            case GET_SERVICES_SUCCESS:
                  return {
                        loading: false,
                        services: action.payload
                  }
            case GET_SERVICES_ERROR:
                  return {
                        loading: false,
                        error: action.payload
                  }
            default:
                  return state
      }
}
export const updateServicesReducer = (state = {}, action) => {
      switch (action.type) {
            case UPDATE_SERVICES_REQUEST:
                  return {
                        updating: true
                  }
            case UPDATE_SERVICES_SUCCESS:
                  return {
                        updating: false,
                        success: action.payload.success,
                        service: action.payload.response
                  }
            case UPDATE_SERVICES_ERROR:
                  return {
                        updating: false,
                        error: action.payload
                  }
            case UPDATE_SERVICES_RESET:
                  return {
                        updating: null,
                  }
            case ADD_NEW_SERVICES_REQUEST:
                  return {
                        adding: true
                  }
            case ADD_NEW_SERVICES_SUCCESS:
                  return {
                        adding: false,
                        newServices: action.payload,
                  }
            case ADD_NEW_SERVICES_ERROR:
                  return {
                        adding: false,
                        error: action.payload
                  }
            case ADD_NEW_SERVICES_RESET:
                  return {
                        adding: null,
                        error: null,
                        newServices: null
                  }
            case CLEAR_SALOON_ERROR:
                  return {
                        error: null
                  }
            default:
                  return state
      }
}
export const updateTagsReducers = (state = {}, action) => {
      switch (action.type) {
            case UPDATE_SALOON_TAGS_REQUEST:
                  return {
                        loading: true
                  }
            case UPDATE_SALOON_TAGS_SUCCESS:
                  return {
                        loading: false,
                        updated: action.payload
                  }
            case UPDATE_SALOON_TAGS_ERROR:
                  return {
                        loading: false,
                        error: action.payload
                  }
            case UPDATE_SALOON_TAGS_RESET:
                  return {
                        loading: null,
                        updated: null,
                        error: null
                  }
            case CLEAR_SALOON_ERROR:
                  return {
                        error: null
                  }
            default:
                  return state
      }
}

export const saloonImagesReducer = (state = {}, action) => {
      switch (action.type) {
            case ADD_IMAGES_REQUEST:
                  return {
                        adding: true
                  }
            case ADD_IMAGES_SUCCESS:
                  return {
                        adding: false,
                        uploaded: action.payload
                  }
            case ADD_IMAGES_ERROR:
                  return {
                        error: action.payload,
                        adding: false
                  }
            case ADD_IMAGES_RESET:
                  return {
                        error: null,
                        adding: null,
                        uploaded: null
                  }
            case DELETE_IMAGES_REQUEST:
                  return {
                        deleting: true
                  }
            case DELETE_IMAGES_SUCCESS:
                  return {
                        deleting: false,
                        deleted: action.payload
                  }
            case DELETE_IMAGES_ERROR:
                  return {
                        error: action.payload,
                        deleting: false
                  }
            case DELETE_IMAGES_RESET:
                  return {
                        error: null,
                        deleted: null
                  }
            default:
                  return state
      }
}
export const deleteSalonReducer = (state = {}, action) => {
      switch (action.type) {
            case DELETE_SALON_DATA_REQUEST:
                  return {
                        deleting: true
                  }
            case DELETE_SALON_DATA_SUCCESS:
                  return {
                        deleting: false,
                        deleted: action.payload
                  }
            case DELETE_SALON_DATA_ERROR:
                  return {
                        error: action.payload,
                        deleting: false
                  }
            case DELETE_SALON_DATA_RESET:
                  return {
                        error: null,
                        deleted: null
                  }
            case CLEAR_SALOON_ERROR:
                  return {
                        error: null,
                        loading: false
                  }
            default:
                  return state
      }
}