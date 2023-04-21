import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getServicesAction,
  updateServicesAction,
} from "../actions/SaloonAction";
import SideBar from "../components/Sidebar/Sidebar";
import Input from "../components/Input/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UPDATE_SERVICES_RESET } from "../constants/SaloonConstants";
import "react-confirm-alert/src/react-confirm-alert.css";
import MetaTitle from "../components/MetaTitle/MetaTitle";
import SaloonEmployees from "./SaloonEmployees";
import { DataGrid } from "@material-ui/data-grid";
const Services = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [field, setField] = useState();
  const [value, setvalue] = useState();
  const [ids, setIds] = useState([]);
  const { services } = useSelector((state) => state.services);
  const { updating, success } = useSelector((state) => state.updateServices);
  const [size, setSize] = useState(100);
  const updatefieilds = (e) => {
    e.preventDefault();
    let empIds = JSON.parse(localStorage.getItem("emps"));
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
      flex: 5,
    },
    {
      field: "about",
      headerName: "About",
      minWidth: 200,
      flex: 5,
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
    {
      field: "newprice",
      headerName: "New Price",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "myemployees",
      headerName: "Employees",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/service/${params.id}/employees`}>
              view employees
            </Link>
          </>
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
        <div style={{ margin: "40px" }}>
          <ToastContainer
            position="top-center"
            hideProgressBar={true}
            theme="colored"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h1>Services</h1>
            <Link to="/salons">Go Back To Salons Page</Link>
          </div>
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
          <DataGrid
            rows={services?.length ? services : []}
            columns={servicesColumns}
            checkboxSelection
            pageSize={size}
            disableColumnSelector
            onPageSizeChange={(newSize) => setSize(newSize)}
            autoHeight
            onSelectionModelChange={(itm) => {
              setIds(itm);
            }}
          />
        </div>
        <SaloonEmployees params={params} />
      </div>
    </div>
  );
};

export default Services;
