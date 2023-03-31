import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AddSalonOfferAction } from "../actions/CoupanActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../components/Sidebar/Sidebar";
import Input from "../components/Input/Input";
import CustomButton from "../components/Button/Button";
const AddOffers = () => {
  const { id } = useParams();
  const { loading, done, error } = useSelector((state) => state.addSaloonOffer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const addOfferHandler = (e) => {
    e.preventDefault();
    if (!text) {
      return alert("please add offer text");
    }
    dispatch(AddSalonOfferAction(id, text));
  };
  useEffect(() => {
    if (error) {
      return toast(error);
    }
    if (done) {
      toast("offer added")
      return navigate("/salons");
    }
  },[navigate,done,error]);
  return (
    <div>
      <SideBar />
      <div
        className="data-table-wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ToastContainer
          position="top-center"
          hideProgressBar={true}
          theme="colored"
        />
        <h1>Add Offer</h1>
        <form onSubmit={addOfferHandler}>
          <Input
            laBel={"Add Offer"}
            value={text}
            inputType={"text"}
            onChange={(e) => setText(e.target.value)}
          />
          <CustomButton
            text={"Add"}
            loading={loading}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default AddOffers;
