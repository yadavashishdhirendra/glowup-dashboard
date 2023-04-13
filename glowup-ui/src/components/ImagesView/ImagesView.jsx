import React from "react";
import CustomButton from "../Button/Button";

const ImagesView = ({ image, deleting, onClick, display, width, height }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "10px",
      }}
    >
      <img
        src={image?.url}
        alt={image?._id}
        style={{
          width: width ? width : "400px",
          height: height ? height : "300px",
        }}
      ></img>
      <CustomButton
        text={"Delete"}
        disabled={deleting ? true : false}
        loading={deleting}
        style={{
          backgroundColor: "black",
          color: "white",
          width: "100%",
          display: display ? "none" : "block",
        }}
        onClick={onClick}
      />
    </div>
  );
};

export default ImagesView;
