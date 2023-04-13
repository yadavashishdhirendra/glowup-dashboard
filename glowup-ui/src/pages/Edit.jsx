import React from "react";
import SideBar from "../components/Sidebar/Sidebar";
import Offers from "../components/Offers/Offers";
import { useParams } from "react-router-dom";
import EditDescription from "../components/EditDescription/EditDescription";

const Edit = () => {
  const { id } = useParams();
  return (
    <div>
      <SideBar />
      <div
        className="data-table-wrapper"
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Offers id={id} />
        <EditDescription id={id} />
      </div>
    </div>
  );
};

export default Edit;
