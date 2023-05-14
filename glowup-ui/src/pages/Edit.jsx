import React, { useEffect, useState } from "react";
import SideBar from "../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import Input from "../components/Input/Input";
import SelectDropDown from "../components/SelectDropDown/SelectDropDown";
import CustomButton from "../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  fetchSingleSaloon,
  updateSaloonDetailsAction,
} from "../actions/SaloonAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { UPDATE_SALOON_DETAILS_RESET } from "../constants/SaloonConstants";
import { TextareaAutosize } from "@mui/material";
import { checkString } from "../util/helper";
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
  const [days, setDays] = useState();
  const [businessHours, setBusinessHours] = useState([]);
  const [from, setFrom] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [to, setTo] = useState("");
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const { saloon } = useSelector((state) => state.saloon);
  const { updated, loading, error } = useSelector(
    (state) => state.updateSaloon
  );
  const dispatch = useDispatch();

  const updateSaloon = () => {
    const numbers = checkString(mobileNo);
    if (numbers.length > 5) {
      return toast("only 5 numbers are allowed");
    }
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
      map,
      description,
      mobileno: numbers,
      offers: offer,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    };
    dispatch(updateSaloonDetailsAction(id, formData));
  };
  const addHoursHandler = (e, days, from, to) => {
    e.preventDefault();
    if (!days || !from || !to) {
      alert("please add all fields");
      return setBusinessHours([]);
    }
    if (businessHours.length >= 7) {
      alert("7 days max can be added");
    } else {
      let data = {
        id: Math.random(),
        day: days,
        from,
        to,
      };
      setBusinessHours([...businessHours, data]);
    }
  };
  const deleteDayHandler = (e, id) => {
    e.preventDefault();
    setBusinessHours(businessHours.filter((t) => t.id !== id));
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
      dispatch(fetchSingleSaloon(id));
      dispatch({ type: UPDATE_SALOON_DETAILS_RESET });
    }
    if (error) {
      toast(error);
    }
  }, [dispatch, id, updated, error]);
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
    setMobileNo(saloon?.mobileno.toString());
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
                onChange={(e) => setOffer(e.target.value)}
              />
              <Input
                laBel={"City"}
                inputType="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Input
                laBel={"State"}
                inputType="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <Input
                laBel={"Pin Code"}
                inputType="text"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
              <Input
                laBel={"map"}
                inputType="text"
                value={map}
                onChange={(e) => setMap(e.target.value)}
              />
              <Input
                laBel={"Latitude"}
                inputType="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
              <Input
                laBel={"Longitude"}
                inputType="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ width: "max-content" }}>WhatsApp No</label>
                <TextareaAutosize
                  style={{ height: "5vh", padding: "15px" }}
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                />
              </div>
              {/* <section style={{ marginLeft: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label>Business Hours</label>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "5px",
                      alignItems: "center",
                    }}
                  >
                    <SelectDropDown
                      text={"Day"}
                      value={days}
                      name="Day"
                      id="Day"
                      array={weekDays}
                      style={{ width: "100px" }}
                      onChange={(e) => setDays(e.target.value)}
                      required={true}
                    />
                    <Input
                      style={{ width: "100px" }}
                      laBel="From"
                      value={from}
                      required
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="00:00 am"
                    ></Input>
                    <Input
                      style={{ width: "100px" }}
                      laBel="To"
                      value={to}
                      required
                      onChange={(e) => setTo(e.target.value)}
                      placeholder="00:00 pm"
                    ></Input>

                    <CustomButton
                      text={"Add"}
                      onClick={(e) => addHoursHandler(e, days, from, to)}
                      style={{ fontSize: "8px", marginLeft: "5px" }}
                    />
                  </div>
                </div>
                <section
                  style={{ backgroundColor: "white", marginRight: "20px" }}
                >
                  {businessHours?.map((time) => (
                    <div style={{ display: "flex" }}>
                      <p>Day-{time.day}</p>
                      <p> &nbsp;</p>
                      <p>From-{time.from}</p>
                      <p>&nbsp;</p>
                      <p>to-{time.to}</p>
                      <DeleteIcon
                        style={{ color: "black" }}
                        onClick={(e) => deleteDayHandler(e, time.id)}
                      />
                    </div>
                  ))}
                </section>
              </section> */}
            </section>
          </div>
        </div>
        <CustomButton text={"Update Saloon"} loading={loading}></CustomButton>
      </form>
    </div>
  );
};

export default Edit;
