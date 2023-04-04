import React, { useEffect, useState } from 'react'
import MetaTitle from '../MetaTitle/MetaTitle'
import SideBar from '../Sidebar/Sidebar'
import './Bookings.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../../actions/UserActions'
import Loader from '../Loader/Loader'
import CustomButton from "../Button/Button"
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import DeleteIcon from "@material-ui/icons/Delete";
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import TableData from '../Table'
const BookingsList = () => {
    const dispatch = useDispatch();
    const [Eror, setEror] = useState()
    const [done, setDone] = useState(false)
    const deleteBooking = async (e, id) => {
        e.preventDefault()
        try {
            confirmAlert({
                title: "Delete Employee",
                message: "Are you sure to do this.",
                buttons: [
                    {
                        label: "Yes",
                        onClick: async () => {
                            const { data } = await axios.delete(`/api/v2/delete-booking/${id}`)
                            setDone(data.done)
                        }
                    },
                    {
                        label: "No",
                        onClick: () => { },
                    },
                ],
                closeOnClickOutside: true,
                closeOnEscape: true,
            });
        } catch (error) {
            setEror(error.response.data.error)
        }
    }
    const { bookings, error, loading } = useSelector((state) => state.bookings);
    const columns = [
        { field: "id", headerName: "Booking Id", flex: 1, minWidth: 250 },
        { field: "date", headerName: "Date", flex: 1, minWidth: 200 },
        { field: "salon", headerName: "Salon Name", flex: 1, minWidth: 250 },
        { field: "client", headerName: "Client", flex: 1, minWidth: 200 },
        { field: "mobile", headerName: "Mobile Number", flex: 1, minWidth: 200 },
        { field: "category", headerName: "Category", flex: 1, minWidth: 250 },
        { field: "service", headerName: "Service Name", flex: 1, minWidth: 200 },
        { field: "stylist", headerName: "Stylist", flex: 1, minWidth: 200 },
        {
            field: "status", headerName: "Status", flex: 1, minWidth: 200, cellClassName: (params) => {
                return params.getValue(params.id, "status") !== "Cancelled" ? "greenColor" : "redColor"
            }
        },
        { field: "price", headerName: "Price", flex: 1, minWidth: 150 },
        { field: "intime", headerName: "In Time", flex: 1, minWidth: 150 },
        { field: "outtime", headerName: "Out Time", flex: 1, minWidth: 150 },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 150,
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Button onClick={(e) => deleteBooking(e, params.id)}>
                            <DeleteIcon style={{ color: "black" }} />
                        </Button>
                    </>
                );
            },
        },
    ];
    useEffect(() => {
        if (error) {
            toast(error)
        }
        if (Eror) {
            toast(Eror)
        }
        if (done) {
            setDone(false)
            dispatch(getAllBookings())
        }
        dispatch(getAllBookings())
    }, [dispatch, error, Eror, done])
    return (
        <div>
            <MetaTitle title='Bookings - Glow Up Salon & Scheduling' />
            {
                loading ? <Loader /> :
                    <>
                        <SideBar />
                        <div className='data-table-wrapper'>
                            <ToastContainer
                                position="top-center"
                                hideProgressBar={true}
                                theme="colored"
                            />
                            <h1>Bookings</h1>
                            <p>{bookings?.length} Records</p>
                            <TableData
                                data={bookings?.length ? bookings : []}
                                columns={columns}
                            />
                            <div style={{ marginTop: "50px" }}>
                                <Link to={"/deleted-bookings"}>
                                    <CustomButton text={" view Deleted bookings"} />
                                </Link>
                            </div>
                        </div>

                    </>
            }
        </div>
    )
}

export default BookingsList