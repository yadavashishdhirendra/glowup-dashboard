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
import { DataGrid } from "@mui/x-data-grid";
import Select from "react-dropdown-select";
import { UPDATE_SALOON_TAGS_RESET } from "../constants/SaloonConstants";
let staticTags = [
  {
    id: "Male",
  },
  {
    id: "Female",
  },
  {
    id: "Unisex",
  },
  {
    id: "Nails",
  },
  {
    id: "Hair Treatment",
  },
  {
    id: "Mani/Pedi",
  },
  {
    id: "Skin Care",
  },
  {
    id: "Waxing",
  },
  {
    id: "Spa",
  },
  { id: "Massage" },
  { id: "Piercing" },
  { id: "Threading" },
];
const Saloons = () => {
  const dispatch = useDispatch();
  const [size,setSize]=useState(25)
  const { saloons } = useSelector((state) => state.allSaloons);
  const { deleted } = useSelector((state) => state.deleteSalonData);
  const { updated, loading } = useSelector((state) => state.tagsUpdate);
  const [action, setAction] = useState("");
  const [ids, setIds] = useState([]);
  const [keys, setKeys] = useState([]);
  const renderKeys = (action) => {
    if (action === "Add" || action === "Remove") {
      return (
        <div>
          <Select
            style={{
              width: "400px",
            }}
            dropdownHeight="250px"
            searchBy="id"
            options={staticTags}
            labelField="id"
            valueField="id"
            dropdownPosition="bottom"
            multi={true}
            required
            onChange={(values) => setKeys(values?.map((val) => val.id))}
          />
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
  const confirmDelete = (e, id) => {
    e.preventDefault();
    confirmAlert({
      title: "Delete Salon?",
      message: "these action will delete all data of salon",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteSalonDataAction(id));
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
      setKeys([])
      setAction("")
      dispatch({type:UPDATE_SALOON_TAGS_RESET})
      dispatch(fetchAllSaloonsAction());
    }
    if (deleted) {
      return window.location.reload();
    }
  }, [dispatch, updated, deleted]);
  const columns = [
    { field: "id", headerName: "Salon Id", minWidth: 250, flex: 2 },
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
      flex: 2,
    },
    {
      field: "keys",
      headerName: "tags",
      minWidth: 900,
      flex: 12,
    },
    {
      field: "offers",
      headerName: "Offers",
      minWidth: 150,
      flex: 2,
    },
    {
      field: "description",
      headerName: "Description",
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
      minWidth: 500,
      flex: 4,
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
            <Link to={`/saloon/${params.id}`}>Edit</Link>
            <p style={{ padding: "20px" }}></p>
            <Link to={`/add-services/${params.row.owner_id}`}>
              Add services
            </Link>
            <p style={{ padding: "20px" }}></p>
            <Link to={`/view-images/salon/${params.id}`}>Images</Link>
            <p style={{ padding: "20px" }}></p>
            <DeleteIcon
              style={{ color: "black" }}
              onClick={(e) => confirmDelete(e, params.row.id)}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <MetaTitle title={"Salons"} />
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
        <DataGrid
          rows={saloons?.length ? saloons : []}
          columns={columns}
          checkboxSelection
          pageSize={size}
          onPageSizeChange={(newSize) => setSize(newSize)}
          autoHeight
          onRowSelectionModelChange={(itm) => {
            setIds(itm);
          }}
        />
      </div>
    </div>
  );
};

export default Saloons;
