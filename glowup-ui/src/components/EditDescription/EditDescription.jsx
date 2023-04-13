import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleSaloon,
  updateSaloonDetailsAction,
} from "../../actions/SaloonAction";
import Input from "../Input/Input";
import CustomButton from "../Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { UPDATE_SALOON_DETAILS_RESET } from "../../constants/SaloonConstants";
import { useNavigate } from "react-router-dom";
const EditDescription = ({ id }) => {
  const [text, setText] = useState();
  const { saloon } = useSelector((state) => state.saloon);
  const { loading, error, updated } = useSelector(
    (state) => state.updateSaloon
  );
  const navigate=useNavigate()
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
      navigate("/salons")
      dispatch({ type: UPDATE_SALOON_DETAILS_RESET });
      
    }
    if (error) {
      toast(error);
    }
  }, [id, dispatch, updated, error,navigate]);
  return (
    <div
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
      <h1 style={{fontSize:"24px"}}>Set Description</h1>
      <form onSubmit={updateHandler}>
        <Input
          inputType={"text"}
          laBel={`${saloon?.shopname} Description`}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <CustomButton text={"Add Description"} loading={loading} />
      </form>
    </div>
  );
};

export default EditDescription;
