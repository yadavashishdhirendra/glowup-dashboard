import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TableData from "../components/Table";
import SideBar from "../components/Sidebar/Sidebar";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch } from "react-redux";
import { deleteEmployeeFromServiceAction } from "../actions/EmployeesAction";
const EmployeesServices = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const deleteEmployee = (e, serviceId) => {
    e.preventDefault();
    confirmAlert({
      title: "Delete Employee From Service?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            dispatch(deleteEmployeeFromServiceAction(serviceId, id));
            await fetchServices();
          },
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
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={(e) => deleteEmployee(e, params.id)}>
              <DeleteIcon style={{ color: "black" }} />
            </Button>
          </>
        );
      },
    },
  ];
  const fetchServices = async () => {
    try {
      const { data } = await axios.get(`/api/v2/employee-services/${id}`);
      console.log(data);
      setServices(data.services);
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <div>
      <SideBar />
      <div className="data-table-wrapper">
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
            marginTop: "80px",
          }}
        >
          <TableData
            data={services?.length ? services : []}
            columns={servicesColumns}
            title="services"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeesServices;
