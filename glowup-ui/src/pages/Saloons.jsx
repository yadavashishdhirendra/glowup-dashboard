import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSalonDataAction,
  fetchAllSaloonsAction,
  updateSaloonTags,
} from "../actions/SaloonAction";
import SideBar from "../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import MetaTitle from "../components/MetaTitle/MetaTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import TableData from "../components/Table";
let staticTags = [
  "Male",
  "Female",
  "Unisex",
  "Nails",
  "Hair Treatment",
  "Mani/Pedi",
  "Skin Care",
  "Waxing",
  "Spa",
  "Extra Massage",
  "Extra Piercing",
  "Extra Threading",
];
const Saloons = () => {
  const dispatch = useDispatch();
  const { saloons } = useSelector((state) => state.allSaloons);
  const {deleted}=useSelector(state=>state.deleteSalonData)
  const { updated, loading } = useSelector((state) => state.tagsUpdate);
  const [action, setAction] = useState("");
  const [ids, setIds] = useState([]);
  const [keys, setKeys] = useState();
  const renderKeys = (action) => {
    if (action === "Add" || action === "Remove") {
      return (
        <div>
          <label>Select Tags</label>
          <br />
          <select value={keys} onChange={(e) => setKeys(e.target.value)}>
            <option> </option>
            {staticTags.map((key) => (
              <option value={key} key={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
      );
    } else {
      return <></>;
    }
  };
  const updateHandler = async (e) => {
    e.preventDefault();
    if (!action || action === "") {
      return toast("select action");
    }
    if (ids.length === 0) {
      return toast("SELECT SALOONS");
    } else {
      confirmAlert({
        title: "Update Saloons",
        message: "Are you sure to do this?",
        buttons: [
          {
            label: "Yes",
            onClick: () =>
              dispatch(
                updateSaloonTags(
                  action,
                  ids,
                  action === "AddAllKeys" ? staticTags : keys
                )
              ),
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
        closeOnClickOutside: true,
        closeOnEscape: true,
      });
    }
  };
  const confirmDelete = (e,id) => {
    e.preventDefault();
  confirmAlert({
    title: "Delete Salon?",
    message: "these action will delete all data of salon",
    buttons: [
      {
        label: "Yes",
        onClick: () => {
          dispatch(deleteSalonDataAction(id))
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
  useEffect(() => {
    dispatch(fetchAllSaloonsAction());
    if (updated?.length) {
      toast("Updated");
      dispatch(fetchAllSaloonsAction());
    }
    if (deleted) {
      return window.location.reload()
    }
  }, [dispatch, updated,deleted]);
  const columns = [
    { field: "id", headerName: "Salon Id", minWidth: 200, flex: 1 },
    { field: "name", headerName: "Salon Name", minWidth: 150, flex: 1 },
    {
      field: "address",
      headerName: "Address",
      minWidth: 350,
      flex: 2,
    },
    {
      field: "owner_id",
      headerName: "Owner",
      minWidth: 270,
      flex: 1,
    },
    {
      field: "keys",
      headerName: "tags",
      minWidth: 350,
      flex: 12,
    },
    {
      field: "offers",
      headerName: "Offers",
      minWidth: 150,
      flex: 2,
    },
    {
      field: "ratings",
      headerName: "Ratings",
      minWidth: 150,
      flex: 2,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 550,
      flex: 8,
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
            <Link to={`/saloon/${params.id}/services/${params.row.owner_id}`}>
              view services
            </Link>
            <p style={{ padding: "20px" }}></p>
            <Link to={`/add-services/${params.row.owner_id}`}>
              Add services
            </Link>
            <p style={{ padding: "20px" }}></p>
            <Link to={`/view-images?saloon=${JSON.stringify(params.row)}`}>
              Images
            </Link>
            <p style={{ padding: "20px" }}></p>
            <Link to={`/add-offers/${params.row.id}`}>Offers</Link>
            <p style={{ padding: "20px" }}></p>
            <DeleteIcon
              style={{ color: "black" }}
              onClick={(e) => confirmDelete(e,params.row.id)}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <MetaTitle title={"Saloons"} />
      <SideBar />
      <div className="data-table-wrapper">
        <ToastContainer
          position="top-center"
          hideProgressBar={true}
          theme="colored"
        />
        <h1>Salons</h1>
        <form onSubmit={updateHandler}>
          <section
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <div>
              <label>Tags Update Action</label>
              <br />
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
              >
                <option> </option>
                <option value="Add">Add</option>
                <option value="AddAllKeys">Add All Keys</option>
                <option value="Remove">Remove</option>
                <option value="RemoveAllKeys">Remove All Keys</option>
              </select>
            </div>
            {renderKeys(action)}
            <div className="login-btn">
              <button type="submit" onClick={() => {}}>
                {loading ? "Updating" : "Update"}
              </button>
            </div>
          </section>
        </form>
        <TableData
          data={saloons?.length ? saloons : []}
          columns={columns}
          onSelectionModelChange={(itm) => {
            setIds(itm);
          }}
        />
      </div>
    </div>
  );
};

export default Saloons;
