import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './components/Login/Login';
import WebFont from 'webfontloader';
import { loadUser } from './actions/UserActions';
import { useDispatch } from 'react-redux';
import store from './store';
import BookingsList from './components/Bookings/BookingsList';
import GenerareCoupans from './pages/GenerareCoupans';
import Coupans from './pages/Coupans';
import Saloons from './pages/Saloons';
import Services from './pages/Services';
import Employees from './pages/Employees';
import EditEmployee from './pages/EditEmployee';
import Accounts from './pages/Accounts';
import SaloonBookings from './pages/SaloonBookings';
import CustomersBookings from './pages/CustomersBookings';
import CustomerCareLogin from './pages/CustomerCareLogin';
import { CareUserload } from './actions/CareUserAction';
import ProctectedDashBoardRoute from './components/ProctectedDashBoardRoute';
import CcProtectedRoute from './components/CcRoutes';
import NewEmployee from './pages/NewEmployee';
import AddServices from './pages/AddServices';
import SaloonImages from './pages/SaloonImages';
import NewSalon from './pages/NewSalon';
import NewAccount from './pages/NewAccount';
import DeletedBookings from './pages/DeletedBookings';
import AddOfferImages from './pages/AddOfferImages';
import Users from './pages/Users';
import ChangePassword from './pages/ChangePassword';
import EmployeesServices from './pages/EmployeesServices';
import Edit from './pages/Edit';
import PositionSalonImages from './pages/PositionSalonImages';
import EditCoupan from './pages/EditCoupan';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'sans-serif']
      }
    })
    store.dispatch(loadUser())
    store.dispatch(CareUserload())
  }, [dispatch])

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route exact path='/bookings' element={
            <ProctectedDashBoardRoute>
              <BookingsList />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/deleted-bookings' element={
            <ProctectedDashBoardRoute>
              <DeletedBookings />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/offer-images' element={
            <ProctectedDashBoardRoute>
              <AddOfferImages />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/all-users' element={
            <ProctectedDashBoardRoute>
              <Users />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/edit/coupan/:id' element={
            <ProctectedDashBoardRoute>
              <EditCoupan/>
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/create-coupons' element={
            <ProctectedDashBoardRoute>
              <GenerareCoupans />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/coupans' element={
            <ProctectedDashBoardRoute>
              <Coupans />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/salons' element={
            <ProctectedDashBoardRoute>
              <Saloons />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/new-account' element={
            <ProctectedDashBoardRoute>
              <NewAccount />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/new-salon/:id' element={
            <ProctectedDashBoardRoute>
              <NewSalon />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/saloon/:id' element={
            <ProctectedDashBoardRoute>
              <Edit />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/view-images/salon/:id' element={
            <ProctectedDashBoardRoute>
              <SaloonImages />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/re-position-images/salon/:id' element={
            <ProctectedDashBoardRoute>
              <PositionSalonImages />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/saloon/:id/services/:owner' element={
            <ProctectedDashBoardRoute>
              <Services />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/service/:id/employees' element={
            <ProctectedDashBoardRoute>
              <Employees />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/employee/:id/services' element={
            <ProctectedDashBoardRoute>
              <EmployeesServices />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/edit/employee/:id' element={
            <ProctectedDashBoardRoute>
              <EditEmployee />
            </ProctectedDashBoardRoute>
          } />

          <Route exact path='/:owner/new-employee/:id' element={
            <ProctectedDashBoardRoute>
              <NewEmployee />
            </ProctectedDashBoardRoute>
          } />

          <Route exact path='/add-services/:id' element={
            <ProctectedDashBoardRoute>
              <AddServices />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/accounting' element={
            <ProctectedDashBoardRoute>
              <Accounts />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/saloon/:id/bookings' element={
            <ProctectedDashBoardRoute>
              <SaloonBookings />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/change-password/:id' element={
            <ProctectedDashBoardRoute>
              <ChangePassword />
            </ProctectedDashBoardRoute>
          } />

          <Route exact path='/todays-bookings' element={
            <CcProtectedRoute>
              <CustomersBookings />
            </CcProtectedRoute>} />
          <Route exact path='/customer-care/login' element={<CustomerCareLogin />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App