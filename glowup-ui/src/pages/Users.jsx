import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../actions/UserActions";
import { Link } from "react-router-dom";
import SideBar from "../components/Sidebar/Sidebar";
import TableData from "../components/Table";
import MetaTitle from "../components/MetaTitle/MetaTitle";
const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.allUsers);
  const columns = [
    { field: "id", headerName: "User Id", minWidth: 250, flex: 1 },
    { field: "name", headerName: "User Name", minWidth: 200, flex: 1 },
    {
      field: "email",
      headerName: "User Email",
      minWidth: 150,
      flex: 2,
    },
    {
      field: "phone",
      headerName: "Contact No",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "saloonId",
      headerName: "Salon Id",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "saloonName",
      headerName: "Salon Name",
      minWidth: 200,
      flex: 2,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex:2,
      sortable: false,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Link to={`/change-password/${params.id}`}>Change Password</Link>
            {!params?.row?.saloonId ? (
              <Link to={`/new-salon/${params.id}`}>Add Salon</Link>
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(getAllUsersAction());
  }, [dispatch]);
  return (
    <div>
      <MetaTitle title="All Users - Glow Up Salon & Scheduling" />
      <SideBar />
      <div className="data-table-wrapper">
        <h1>{users?.length} Users</h1>
        <TableData columns={columns} data={users?.length ? users : []} />
      </div>
    </div>
  );
};

export default Users;
