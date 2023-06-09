import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { allUsersReducers, bookingsReducer, dateBookingsReducer, userReducer } from './Reducers/UserReducers';
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import { addOfferReducer, createCoupanReducer, deleteCoupanReducer, editCoupanReducer, fetchAllCoupansReducer, getSingleCoupanReducer } from "./Reducers/CoupanReducers";
import { deleteSalonReducer, fetchAllSaloonsReducer, getServicesReducer, getSingleSaloonReducer, saloonImagesReducer, updateSaloonDetailsReducer, updateServicesReducer, updateTagsReducers } from "./Reducers/SaloonReducers";
import { deleteEmployeeReducer, editEmployeeReducer, getEmployeesReducer } from "./Reducers/EmployeesReducer";
import { CustomerCareUserReducer } from "./Reducers/CareReducer";
import { GetAllImagesReducer } from "./Reducers/OfferReducer";
const reducer = combineReducers({
        user: userReducer,
        bookings: bookingsReducer,
        newCoupan: createCoupanReducer,
        coupans: fetchAllCoupansReducer,
        singleCoupan:getSingleCoupanReducer,
        deleteCoupan: deleteCoupanReducer,
        allSaloons: fetchAllSaloonsReducer,
        saloon: getSingleSaloonReducer,
        tagsUpdate: updateTagsReducers,
        services: getServicesReducer,
        employees: getEmployeesReducer,
        updateServices: updateServicesReducer,
        deleteEmployee: deleteEmployeeReducer,
        editEmployee: editEmployeeReducer,
        dateBookings: dateBookingsReducer,
        customerCare: CustomerCareUserReducer,
        saloonImages: saloonImagesReducer,
        addSaloonOffer: addOfferReducer,
        deleteSalonData: deleteSalonReducer,
        offerImages: GetAllImagesReducer,
        allUsers: allUsersReducers,
        editCoupan:editCoupanReducer,
        updateSaloon: updateSaloonDetailsReducer
})

let initialState = {}
const midleware = [thunk]
const devTools =
        process.env.NODE_ENV === "production"
                ? applyMiddleware(...midleware)
                : composeWithDevTools(applyMiddleware(...midleware));
const store = createStore(reducer, initialState, devTools)
export default store