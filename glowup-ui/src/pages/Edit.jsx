import React, { useEffect, useState } from "react";
import SideBar from "../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
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
import { TextareaAutosize } from "@mui/material";
import { checkString } from "../util/helper";
const companyType = [
  "Sole Proprietorship",
  "Private Limited",
  "Partnership",
  "Other",
];
const weekdayMap = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
};
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

  const updateSaloon = (hours) => {
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
      businesshours: hours,
      mobileno: numbers,
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
    let resp = {
      day: days,
      from,
      to,
    };
    let newHours = businessHours.filter(
      (h) => h?.day?.toLowerCase() !== resp?.day?.toLowerCase()
    );
    if (resp?.day) {
      newHours.push(resp);
    }
    const compareWeekdays = (a, b) => weekdayMap[a.day] - weekdayMap[b.day];
    newHours.sort(compareWeekdays);
    confirmAlert({
      title: "Update Salon?",
      buttons: [
        {
          label: "Yes",
          onClick: () => updateSaloon(newHours.sort()),
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
    setBusinessHours(saloon?.businesshours);
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
            </section>
            {/* set business hours */}
            <div style={{ marginLeft: "20px" }}>
              <section>
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
                    />
                    <Input
                      style={{ width: "100px" }}
                      laBel="From"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="00:00 am"
                    ></Input>
                    <Input
                      style={{ width: "100px" }}
                      laBel="To"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      placeholder="00:00 pm"
                    ></Input>
                  </div>
                </div>
              </section>
              <section style={{ backgroundColor: "white" }}>
                {saloon?.businesshours?.map((b) => (
                  <p>
                    {b?.day},&nbsp;&nbsp;&nbsp;&nbsp; From:{b?.from}
                    ,&nbsp;&nbsp;&nbsp;&nbsp; To:
                    {b?.to}
                  </p>
                ))}
              </section>
            </div>
          </div>
        </div>
        <CustomButton text={"Update Saloon"} loading={loading}></CustomButton>
      </form>
    </div>
  );
};

export default Edit;
