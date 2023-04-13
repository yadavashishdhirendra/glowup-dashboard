import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddSalonOfferAction } from "../../actions/CoupanActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../Input/Input";
import CustomButton from "../Button/Button";
const Offers = ({ id }) => {
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
      toast("offer added");
      return navigate("/salons");
    }
  }, [navigate, done, error]);
  return (
    <div
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
      <h1 style={{ fontSize: "24px" }}>Add Offer</h1>
      <form onSubmit={addOfferHandler}>
        <Input
          laBel={"Add Offer"}
          value={text}
          inputType={"text"}
          onChange={(e) => setText(e.target.value)}
        />
        <CustomButton text={"Add Offer"} loading={loading} disabled={loading} />
      </form>
    </div>
  );
};

export default Offers;
