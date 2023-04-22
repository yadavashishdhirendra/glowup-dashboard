import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AiFillEdit } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmployeeAction,
  getAllEmployeesAction,
} from "../actions/EmployeesAction";
import DeleteIcon from "@material-ui/icons/Delete";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

import { DataGrid } from "@mui/x-data-grid";
const SaloonEmployees = ({ params }) => {
  const [empIds, setEmpids] = useState([]);
  const { employees } = useSelector((state) => state.employees);
  const { deleted } = useSelector((state) => state.deleteEmployee);
  localStorage.setItem("emps", JSON.stringify(empIds));
  const dispatch = useDispatch();
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Employee",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteEmployeeAction(id)),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
      closeOnClickOutside: true,
      closeOnEscape: true,
    });
  };
  const employeesColumn = [
    { field: "id", headerName: "Employee Id", maxWidth: 250, flex: 2 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },
    { field: "intime", headerName: "In Time", maxWidth: 150, flex: 1 },
    {
      field: "outtime",
      headerName: "Out Time",
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      maxWidth: 250,
      flex: 2,
      sortable: false,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link to={`/employee/${params.id}/services`}>view services</Link>
            <p style={{ padding: "20px" }}></p>
            <DeleteIcon
              style={{ color: "black" }}
              onClick={() => confirmDelete(params.id)}
            />
            <p style={{ padding: "20px" }}></p>
            <Link to={`/edit/employee/${params.id}`}>
              <AiFillEdit style={{ color: "black", fontSize: "24px" }} />
            </Link>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(getAllEmployeesAction(params.owner));
    if (deleted) {
      toast("Emp deleted");
      dispatch(getAllEmployeesAction(params.owner));
    }
  }, [dispatch, params.owner, deleted]);
  return (
    <div style={{ marginTop: "40px", marginBottom: "20px" }}>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        theme="colored"
      />
      <div style={{ margin: "40px" }}>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
          }}
        >
          <h1>Employees</h1>
          <div className="login-btn">
            <Link to={`/${params.owner}/new-employee/${params.id}`}>
              Add New Employee
            </Link>
          </div>
        </section>
        <div style={{ marginBottom: "200px" }}>
          <DataGrid
            rows={employees?.length ? employees : []}
            columns={employeesColumn}
            checkboxSelection
            onRowSelectionModelChange={(itm) => {
                 setEmpids(itm);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SaloonEmployees;
