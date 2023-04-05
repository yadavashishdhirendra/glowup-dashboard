import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import SideBar from "../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import Input from "../components/Input/Input";
import { accountsAction } from "../actions/SaloonAction";
import MetaTitle from "../components/MetaTitle/MetaTitle";
const Accounts = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const dispatch = useDispatch();
  const { saloons, error } = useSelector((state) => state.allSaloons);
  const accountHandler = async (e) => {
    e.preventDefault();
    if (!start || !end) {
      return alert("please fill all fields");
    } else {
      dispatch(accountsAction(start, end));
    }
  };
  const columns = [
    { field: "id", headerName: "Salon Id", minWidth: 200, flex: 1 },
    { field: "name", headerName: "Salon Name", minWidth: 150, flex: 1 },
    {
      field: "totatAmountWithDiscount",
      headerName: "After Discount",
      minWidth: 270,
      flex: 1,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 100,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/saloon/${params.id}/bookings`}>
              view bookings
            </Link>
          </>
        );
      },
    },
  ];
  return (
    <div>
      <MetaTitle title={"Accounts"}/>
      <SideBar />
      <div className="data-table-wrapper">
        <h1>Salons</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Input
            inputType={"date"}
            laBel="From"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <Input
            inputType={"date"}
            laBel="To"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
          <div className="login-btn">
            <button type="submit" onClick={accountHandler}>
              Submit
            </button>
          </div>
        </div>
        {error && <p>{error}</p>}
        {saloons?.length ? (
          <DataGrid
            rows={saloons?.length? saloons : []}
            columns={columns}
            pageSize={100}
            autoHeight
            sortingOrder="null"
          />
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Accounts;
