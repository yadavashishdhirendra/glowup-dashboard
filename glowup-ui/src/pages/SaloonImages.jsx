import { ImageList, ImageListItem } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams } from "react-router-dom";
import {
  addSaloonImages,
  deleteSaloonImages,
  fetchSingleSaloon,
} from "../actions/SaloonAction";
import CustomButton from "../components/Button/Button";
import ImagesView from "../components/ImagesView/ImagesView";
import SideBar from "../components/Sidebar/Sidebar";
import {
  ADD_IMAGES_RESET,
  DELETE_IMAGES_RESET,
} from "../constants/SaloonConstants";
import Loader from "../components/Loader/Loader";

const SaloonImages = () => {
  const { id } = useParams();
  const [images, setImages] = useState();
  const [imagesPreview, setImagesPreview] = useState([]);
  const dispatch = useDispatch();
  const { adding, deleting, deleted, uploaded } = useSelector(
    (state) => state.saloonImages
  );
  const { saloon, loading } = useSelector((state) => state.saloon);

  const navigate = useNavigate();

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages(files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const deleteImageHandler = (e, owner, action, id) => {
    e.preventDefault();
    dispatch(deleteSaloonImages(owner, action, id));
  };
  const addImagesHandler = async (e) => {
    e.preventDefault();
    dispatch(addSaloonImages(saloon.owner, images));
  };

  useEffect(() => {
    if (deleted | uploaded) {
      dispatch({ type: DELETE_IMAGES_RESET });
      dispatch({ type: ADD_IMAGES_RESET });
      dispatch(fetchSingleSaloon(id))
    }
    dispatch(fetchSingleSaloon(id));
  }, [navigate, deleted, dispatch, uploaded, id]);
  return (
    <div style={{ height: "150vh" }}>
      <SideBar />
      <div className="data-table-wrapper">
        <CustomButton
          disabled={deleting ? true : false}
          text="Delete All"
          onClick={(e) =>
            deleteImageHandler(e, saloon?.owner, "deleteAll", "")
          }
        />
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
          {loading ? (
            <Loader />
          ) : (
            saloon?.images?.map((image) => (
              <ImagesView
                image={image}
                deleting={deleting}
                onClick={(e) =>
                  deleteImageHandler(
                    e,
                    saloon?.owner,
                    "deleteOne",
                    image?.public_id
                  )
                }
              />
            ))
          )}
        </div>

        <div style={{ margin: "50px" }} className="data-table-wrapper">
          <h1>Add New Images</h1>
          <form encType="multipart/form-data" onSubmit={addImagesHandler}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <input
                type={"file"}
                onChange={createProductImagesChange}
                multiple
              />
              <CustomButton
                text={"Add Images"}
                disabled={adding ? true : false}
                loading={adding}
              ></CustomButton>
            </div>
            <div style={{ margin: "20px" }}>
              {imagesPreview.length ? (
                <ImageList variant="masonry" cols={3} gap={8}>
                  {imagesPreview?.map((item) => (
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default SaloonImages;
