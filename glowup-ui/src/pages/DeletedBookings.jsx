import React, { useEffect } from "react";
import MetaTitle from "../components/MetaTitle/MetaTitle";
import SideBar from "../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import { getDeletedBookingsAction } from "../actions/UserActions";
import TableData from "../components/Table";
const DeletedBookings = () => {
  const dispatch = useDispatch();
  const { deleted, error, loading } = useSelector((state) => state.bookings);
  const columns = [
    { field: "id", headerName: "Booking Id", flex: 1, minWidth: 250 },
    { field: "date", headerName: "Date", flex: 1, minWidth: 200 },
    { field: "shopname", headerName: "Salon Name", flex: 1, minWidth: 250 },
    { field: "client", headerName: "Client", flex: 1, minWidth: 200 },
    { field: "mobile", headerName: "Mobile Number", flex: 1, minWidth: 200 },
    { field: "category", headerName: "Category", flex: 1, minWidth: 250 },
    { field: "service", headerName: "Service Name", flex: 1, minWidth: 200 },
    { field: "stylist", headerName: "Stylist", flex: 1, minWidth: 200 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 200,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") !== "Cancelled"
          ? "greenColor"
          : "redColor";
      },
    },
    { field: "price", headerName: "Price", flex: 1, minWidth: 150 },
    { field: "intime", headerName: "In Time", flex: 1, minWidth: 150 },
    { field: "outtime", headerName: "Out Time", flex: 1, minWidth: 150 },
  ];
  useEffect(() => {
    if (error) {
      alert(error);
    }
    dispatch(getDeletedBookingsAction());
  }, [dispatch, error]);
  return (
    <div>
      <MetaTitle title="Bookings - Glow Up Salon & Scheduling" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <SideBar />
          <div className="data-table-wrapper">
            <h1>Deleted Bookings</h1>
            <p>{deleted?.length} Records</p>
            <TableData
              columns={columns}
              data={deleted?.length ? deleted : []}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DeletedBookings;
