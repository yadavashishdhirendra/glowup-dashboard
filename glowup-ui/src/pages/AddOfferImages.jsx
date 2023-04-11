import React, { useEffect, useState } from "react";
import SideBar from "../components/Sidebar/Sidebar";
import CustomButton from "../components/Button/Button";
import { ImageList, ImageListItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  addOffersImages,
  deleteOfferImageAction,
  fetchAllOffersImages,
} from "../actions/OfferAction";
import ImagesView from "../components/ImagesView/ImagesView";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddOfferImages = () => {
  const { offers, error, adding, done, deleted } = useSelector(
    (state) => state.offerImages
  );
  const [images, setImages] = useState();
  const [preview, setPreview] = useState([]);
  const dispatch = useDispatch();
  const addImagesHandler = async (e) => {
    e.preventDefault();
    dispatch(addOffersImages(images))
    setImages([])
    setPreview([])
  };
  const createImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setPreview([]);
    setImages(files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  useEffect(() => {
    dispatch(fetchAllOffersImages());
    if (error) {
      toast(error);
    }
    if (done) {
      toast("Uploaded Images")
      setImages([])
      setPreview([])
      dispatch(fetchAllOffersImages());
    }
    if (deleted) {
      toast("Image Deleted");
      dispatch(fetchAllOffersImages());
    }
  }, [dispatch, error, done, deleted]);
  return (
    <div>
      <SideBar />
      <div
        className="data-table-wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ToastContainer
          position="top-center"
          hideProgressBar={true}
          theme="colored"
        />
        {offers?.length ? (
          <div
            style={{
              margin: "50px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              height: "55vh",
              overflow: "scroll",
              overflowX: "hidden",
            }}
          >
            {offers?.map((image) => (
              <ImagesView
                image={image}
                onClick={() => dispatch(deleteOfferImageAction(image?._id))}
              />
            ))}
          </div>
        ) : (
          <></>
        )}
        <h1>Add Offer Images</h1>
        <form encType="multipart/form-data" onSubmit={addImagesHandler} style={{marginTop:"40px"}}>
          <input type={"file"} onChange={createImagesChange} multiple />
          <CustomButton text={"Add Images"} loading={adding} />
        </form>

        <div style={{ marginTop: "10px" }}>
          {preview?.length ? (
            <ImageList variant="masonry" cols={3} gap={8} rowHeight={400}>
              {preview?.map((item) => (
                <ImageListItem key={item}>
                  <img
                    src={`${item}`}
                    srcSet={`${item}`}
                    alt={item}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddOfferImages;
