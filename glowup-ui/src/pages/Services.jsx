import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getServicesAction,
  updateServicesAction,
} from "../actions/SaloonAction";
import SideBar from "../components/Sidebar/Sidebar";
import Input from "../components/Input/Input";
import {
  deleteEmployeeAction,
  getAllEmployeesAction,
} from "../actions/EmployeesAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UPDATE_SERVICES_RESET } from "../constants/SaloonConstants";
import DeleteIcon from "@material-ui/icons/Delete";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { AiFillEdit } from "react-icons/ai";
import MetaTitle from "../components/MetaTitle/MetaTitle";
import TableData from "../components/Table";
const Services = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [field, setField] = useState();
  const [value, setvalue] = useState();
  const [ids, setIds] = useState([]);
  const [empIds, setEmpids] = useState([]);
  const { services } = useSelector((state) => state.services);
  const { employees } = useSelector((state) => state.employees);
  const { updating, success } = useSelector((state) => state.updateServices);
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
  const updatefieilds = (e) => {
    e.preventDefault();
    if (field === "myemployees" && empIds.length > 0) {
      setvalue(empIds);
      dispatch(updateServicesAction(field, value, ids, empIds));
      setvalue("");
    } else if (!ids.length) {
      alert("select serivices");
    } else if (field === "myemployees" && !empIds.length) {
      alert("select employees");
    } else {
      dispatch(updateServicesAction(field, value, ids, empIds));
      setvalue("");
    }
  };
  useEffect(() => {
    if (success) {
      toast("services updated");
      setTimeout(() => {
        dispatch({ type: UPDATE_SERVICES_RESET });
      }, 5000);
    }
    dispatch(getServicesAction(params.id));
    dispatch(getAllEmployeesAction(params.owner));
  }, [dispatch, params, success]);
  const servicesColumns = [
    { field: "id", headerName: "Service Id", minWidth: 250, flex: 1.5 },
    {
      field: "servicetype",
      headerName: "Type",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 200,
      flex: 5,
    },
    {
      field: "servicename",
      headerName: "Service Name",
      minWidth: 270,
      flex: 1.5,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 200,
      length: 500,
      flex: 10,
    },
    {
      field: "myemployees",
      headerName: "Employees",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/service/${params.getValue(params.id, "id")}/employees`}>
              view employees
            </Link>
          </>
        );
      },
    },
    {
      field: "hour",
      headerName: "Hours",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 150,
      flex: 1,
    },
  ];
  const employeesColumn = [
    { field: "id", headerName: "Employee Id", minWidth: 250, flex: 2 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },
    { field: "intime", headerName: "In Time", minWidth: 150, flex: 1 },
    {
      field: "outtime",
      headerName: "Out Time",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "50%",
            }}
          >
            <DeleteIcon
              style={{ color: "black" }}
              onClick={() => confirmDelete(params.id)}
            />

            <Link to={`/edit/employee/${params.id}`}>
              <AiFillEdit style={{ color: "black", fontSize: "24px" }} />
            </Link>
          </div>
        );
      },
    },
  ];
  const keys = Object.keys(services?.length ? services[0] : "");
  return (
    <div>
      <MetaTitle title={"services"} />
      <div>
        <SideBar />
        <div className="data-table-wrapper">
          <h1>Services</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <div>
              <label>Select Field To Update</label>
              <br />
              <select value={field} onChange={(e) => setField(e.target.value)}>
                <option> </option>
                {keys.map((key) => (
                  <option value={key} key={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>

            <Input
              inputType={"text"}
              laBel="Update Field"
              value={value}
              onChange={(e) => setvalue(e.target.value)}
            />
            <div className="login-btn">
              <button type="submit" onClick={updatefieilds}>
                {updating ? "updating..." : "update"}
              </button>
            </div>
          </div>

          <TableData
            data={services?.length ? services : []}
            columns={servicesColumns}
            title="services"
            onSelectionModelChange={(itm) => {
              setIds(itm);
            }}
          />
        </div>
        <div style={{ marginTop: "40px", marginBottom: "20px" }}>
          <ToastContainer
            position="top-center"
            hideProgressBar={true}
            theme="colored"
          />
          <div className="data-table-wrapper" style={{ marginBottom: "20px" }}>
            <section
              style={{
                display: "flex",
                flexDirection:"column",
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
              <TableData
                data={employees?.length ? employees : []}
                columns={employeesColumn}
                title="employees"
                onSelectionModelChange={(itm) => {
                  setEmpids(itm);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
