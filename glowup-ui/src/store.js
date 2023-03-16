import {legacy_createStore as createStore,combineReducers,applyMiddleware} from "redux";
import { bookingsReducer, dateBookingsReducer, userReducer } from './Reducers/UserReducers';
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import { createCoupanReducer, deleteCoupanReducer, fetchAllCoupansReducer } from "./Reducers/CoupanReducers";
import { fetchAllSaloonsReducer, getServicesReducer, updateServicesReducer } from "./Reducers/SaloonReducers";
import { deleteEmployeeReducer, editEmployeeReducer, getEmployeesReducer } from "./Reducers/EmployeesReducer";
import { CustomerCareUserReducer } from "./Reducers/CareReducer";
const reducer = combineReducers({
        user: userReducer,
        bookings: bookingsReducer,
        newCoupan: createCoupanReducer,
        coupans: fetchAllCoupansReducer,
        deleteCoupan: deleteCoupanReducer,
        allSaloons: fetchAllSaloonsReducer,
        services: getServicesReducer,
        employees: getEmployeesReducer,
        updateServices: updateServicesReducer,
        deleteEmployee: deleteEmployeeReducer,
        editEmployee: editEmployeeReducer,
        dateBookings: dateBookingsReducer,
        customerCare:CustomerCareUserReducer
})

let initialState = {}
const midleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...midleware)))
export default store