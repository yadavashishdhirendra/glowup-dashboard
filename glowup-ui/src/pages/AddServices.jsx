import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addNewServicesAction } from "../actions/SaloonAction";
import SideBar from "../components/Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddServices = () => {
  const { id } = useParams();
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const { adding, newServices, error } = useSelector(
    (state) => state.updateServices
  );
  const dispatch = useDispatch();
  const postImageChange = (e) => {
    setFile(e.target.files[0]);
  };
  const addserviceshandler = () => {
    dispatch(addNewServicesAction(id, file));
  };
  useEffect(() => {
    if (newServices?.length) {
      navigate("/saloons");
    }
    if (error) {
      toast(error);
    }
  }, [navigate, newServices?.length,error]);
  return (
    <div>
      <SideBar />
      <div className="data-table-wrapper">
        <ToastContainer
          position="top-center"
          hideProgressBar={true}
          theme="colored"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input type={"file"} onChange={postImageChange} />
          <p>{JSON.stringify(file)}</p>
          <div className="login-btn">
            <button
              type="submit"
              disabled={adding ? true : false}
              onClick={addserviceshandler}
            >
              {adding ? "Loading" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddServices;
