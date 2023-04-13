import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleSaloon,
  updateSaloonDetailsAction,
} from "../actions/SaloonAction";
import SideBar from "../components/Sidebar/Sidebar";
import Input from "../components/Input/Input";
import CustomButton from "../components/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { UPDATE_SALOON_DETAILS_RESET } from "../constants/SaloonConstants";
const EditDescription = () => {
  const { id } = useParams();
  const [text, setText] = useState();
  const { saloon } = useSelector((state) => state.saloon);
  const { loading, error, updated } = useSelector(
    (state) => state.updateSaloon
  );
  const dispatch = useDispatch();
  const updateHandler = async (e) => {
    e.preventDefault();
    confirmAlert({
      title: "Update Saloons",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(updateSaloonDetailsAction(id, text)),
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
    dispatch(fetchSingleSaloon(id));
    if (updated) {
      dispatch(fetchSingleSaloon(id));
      dispatch({ type: UPDATE_SALOON_DETAILS_RESET });
    }
    if (error) {
      toast(error);
    }
  }, [id, dispatch, updated, error]);
  return (
    <div>
      <SideBar />
      <div
        className="data-table-wrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ToastContainer
          position="top-center"
          hideProgressBar={true}
          theme="colored"
        />
        <h1>
          {saloon?.shopname}-{saloon?.description}
        </h1>
        <form onSubmit={updateHandler}>
          <Input
            inputType={"text"}
            laBel={`${saloon?.shopname} Description`}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <CustomButton text={"Add Description"} loading={loading}/>
        </form>
      </div>
    </div>
  );
};

export default EditDescription;
