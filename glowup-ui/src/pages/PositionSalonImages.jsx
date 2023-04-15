import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/Sidebar/Sidebar";
import { fetchSingleSaloon } from "../actions/SaloonAction";
import Loader from "../components/Loader/Loader";
import ImagesView from "../components/ImagesView/ImagesView";
import CustomButton from "../components/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";

const PositionSalonImages = () => {
  const { id } = useParams();
  const [sucess, setSucess] = useState();
  const [dragIndex, setIndex] = useState();
  const [images, setImages] = useState([]);
  const { saloon, loading } = useSelector((state) => state.saloon);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updatePositions = async () => {
    try {
      const { data } = await axios.put(
        `/api/v2/change-image-position/saloon/${id}`,
        { images }
      );
      setSucess(data.done);
    } catch (error) {
      toast(error.response.data.error);
    }
  };
  const changePositionHandler = (e) => {
    e.preventDefault();
    confirmAlert({
      title: "Update Positions?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await updatePositions();
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
  const handleDrop = (e, array, dragIndex, dropIndex) => {
    e.preventDefault();
    let temp = array[dropIndex];
    array[dropIndex] = array[dragIndex];
    array[dragIndex] = temp;
    setImages(array);
    setIndex(null);
  };
  useEffect(() => {
    dispatch(fetchSingleSaloon(id));
    if (sucess) {
      navigate(`/view-images/salon/${id}`);
    }
  }, [dispatch, id,navigate,sucess]);
  useEffect(() => {
    setImages(saloon?.images);
  }, [saloon]);
  return (
    <div>
      <SideBar />
      <div className="data-table-wrapper" style={{ height: "150vh" }}>
        <ToastContainer
          position="top-center"
          hideProgressBar={true}
          theme="colored"
        />
        <div
          style={{
            margin: "50px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? (
            <Loader />
          ) : (
            images?.map((image, index) => (
              <>
                <div
                  key={index}
                  draggable={true}
                  onDragStart={() => setIndex(index)}
                  onDragOver={(event) => {
                    event.preventDefault();
                  }}
                  onDrop={(e) => handleDrop(e, images, dragIndex, index)}
                >
                  <ImagesView
                    image={image}
                    display={true}
                    width={"200px"}
                    height={"200px"}
                  />
                </div>
              </>
            ))
          )}
        </div>
        <CustomButton text={"Update"} onClick={changePositionHandler} />
      </div>
    </div>
  );
};

export default PositionSalonImages;
