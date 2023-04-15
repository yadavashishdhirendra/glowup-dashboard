import React, { useEffect, useState } from "react";
import SideBar from "../components/Sidebar/Sidebar";
import {useParams } from "react-router-dom";
import Input from "../components/Input/Input";
import SelectDropDown from "../components/SelectDropDown/SelectDropDown";
import CustomButton from "../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleSaloon,
  updateSaloonDetailsAction,
} from "../actions/SaloonAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { UPDATE_SALOON_DETAILS_RESET } from "../constants/SaloonConstants";
const companyType = [
  "Sole Proprietorship",
  "Private Limited",
  "Partnership",
  "Other",
];
const Edit = () => {
  const { id } = useParams();
  const [shopname, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [businessMailId, setBusinessId] = useState("");
  const [type, setType] = useState("");
  const [address, setAdress] = useState("");
  const [addresssec, setAdressSec] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState();
  const [pin, setPin] = useState();
  const [map, setMap] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [offer, setOffer] = useState();
  const [description, setDescription] = useState();

  const { saloon } = useSelector((state) => state.saloon);
  const { updated, loading, error } = useSelector(
    (state) => state.updateSaloon
  );
  const dispatch = useDispatch();

  const updateSaloon = () => {
    let formData = {
      shopname,
      ownername: ownerName,
      businessemailid: businessMailId,
      companytype: type,
      address,
      addresssec,
      city,
      state,
      pincode: pin,
      owner: id,
      map,
      description,
      offers: offer,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    };
    dispatch(updateSaloonDetailsAction(id, formData));
  };
  const updateSaloonHandler = (e) => {
    e.preventDefault();
    confirmAlert({
      title: "Update Salon?",
      buttons: [
        {
          label: "Yes",
          onClick: () => updateSaloon(),
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
      toast("Salon Updated");
      dispatch(fetchSingleSaloon(id))
      dispatch({ type: UPDATE_SALOON_DETAILS_RESET });
    }
    if (error) {
      toast(error);
    }
  }, [dispatch, id, updated,error]);
  useEffect(() => {
    setShopName(saloon?.shopname);
    setOwnerName(saloon?.ownername);
    setBusinessId(saloon?.businessemailid);
    setType(saloon?.companytype);
    setAdress(saloon?.address);
    setAdressSec(saloon?.addresssec);
    setCity(saloon?.city);
    setState(saloon?.state);
    setPin(saloon?.pincode);
    setMap(saloon?.map);
    setLatitude(saloon?.location?.coordinates[1]);
    setLongitude(saloon?.location?.coordinates[0]);
    setDescription(saloon?.description);
    setOffer(saloon?.offers);
  }, [saloon]);
  return (
    <div>
      <SideBar />
      <form onSubmit={updateSaloonHandler}>
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
          <h1>Edit-{saloon?.shopname}</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "20px",
            }}
          >
            <section style={{ marginRight: "20px" }}>
              <Input
                laBel={"Shop Name"}
                inputType="text"
                value={shopname}
                onChange={(e) => setShopName(e.target.value)}
              />
              <Input
                laBel={"Owner Name"}
                inputType="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
              <Input
                laBel={"Owner Id"}
                inputType="text"
                value={saloon?.owner}
              />
              <Input
                laBel={"Business Email"}
                inputType="email"
                value={businessMailId}
                onChange={(e) => setBusinessId(e.target.value)}
              />
              <Input
                laBel={"Description"}
                inputType="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <SelectDropDown
                text={"Company Type"}
                value={type}
                name="type"
                id="type"
                array={companyType}
                onChange={(e) => setType(e.target.value)}
              />
              <Input
                laBel={"Address 1"}
                inputType="text"
                value={address}
                onChange={(e) => setAdress(e.target.value)}
              />
              <Input
                laBel={"Address 2"}
                inputType="text"
                value={addresssec}
                onChange={(e) => setAdressSec(e.target.value)}
              />
            </section>
            <section>
              <Input
                laBel={"Offer"}
                inputType="text"
                value={offer}
                required
                onChange={(e) => setOffer(e.target.value)}
              />
              <Input
                laBel={"City"}
                inputType="text"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
              <Input
                laBel={"State"}
                inputType="text"
                value={state}
                required
                onChange={(e) => setState(e.target.value)}
              />
              <Input
                laBel={"Pin Code"}
                inputType="text"
                value={pin}
                required
                onChange={(e) => setPin(e.target.value)}
              />
              <Input
                laBel={"map"}
                inputType="text"
                value={map}
                required
                onChange={(e) => setMap(e.target.value)}
              />
              <Input
                laBel={"Latitude"}
                inputType="text"
                value={latitude}
                required
                onChange={(e) => setLatitude(e.target.value)}
              />
              <Input
                laBel={"Longitude"}
                inputType="text"
                value={longitude}
                required
                onChange={(e) => setLongitude(e.target.value)}
              />
            </section>
          </div>
        </div>
        <CustomButton text={"Update Saloon"} loading={loading}></CustomButton>
      </form>
    </div>
  );
};

export default Edit;
