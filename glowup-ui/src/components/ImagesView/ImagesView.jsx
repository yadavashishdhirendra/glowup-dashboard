import React from 'react'
import CustomButton from '../Button/Button';

const ImagesView = ({image,deleting,onClick}) => {
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
        style={{ width: "400px", height: "300px" }}
      ></img>
      <CustomButton
        text={"Delete"}
        disabled={deleting ? true : false}
        loading={deleting}
        style={{
          backgroundColor: "black",
          color: "white",
          width: "100%",
        }}
        onClick={onClick}
      />
    </div>
  );
}

export default ImagesView