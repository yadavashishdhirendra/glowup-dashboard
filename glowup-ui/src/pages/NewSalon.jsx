import React, { useState } from "react";
import Input from "../components/Input/Input";
import SideBar from "../components/Sidebar/Sidebar";
import CustomButton from "../components/Button/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import SelectDropDown from "../components/SelectDropDown/SelectDropDown";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TextareaAutosize } from "@material-ui/core";
import { checkString } from "../util/helper";
const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const companyType = [
  "Sole Proprietorship",
  "Private Limited",
  "Partnership",
  "Other",
];
const NewSalon = () => {
  let { id } = useParams();
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
  const [days, setDays] = useState();
  const [number, setNumbers] = useState();
  const [businessHours, setBusinessHours] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const navigate = useNavigate("");

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
  const addSaloonhandler = async (e) => {
    e.preventDefault();
      let mobileNo = checkString(number);
      if (mobileNo.length > 5) {
        return alert("only 5 numbers are allowed");
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
      owner: id,
      map,
      mobileno:mobileNo,
      businesshours: businessHours,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    };
    if (!businessHours.length) {
      return alert("business hours is not filled");
    }
    try {
      const { data } = await axios.post("/api/v2/new-salon", formData);
      if (data?.newSalon) {
        localStorage.removeItem("newUser");
        return navigate("/salons");
      }
    } catch (error) {
      return alert(error.response.data.error);
    }
  };

  return (
    <div>
      <SideBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Add New Salon</h1>
        <form onSubmit={addSaloonhandler}>
          <div
            className="data-table-wrapper"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <section style={{ marginRight: "20px" }}>
              <Input
                laBel={"Shop Name"}
                inputType="text"
                value={shopname}
                required
                onChange={(e) => setShopName(e.target.value)}
              />
              <Input
                laBel={"Owner Name"}
                inputType="text"
                value={ownerName}
                required
                onChange={(e) => setOwnerName(e.target.value)}
              />
              <Input laBel={"Owner Id"} inputType="text" value={id} />
              <Input
                laBel={"Business Email"}
                inputType="email"
                value={businessMailId}
                required
                onChange={(e) => setBusinessId(e.target.value)}
              />
              <SelectDropDown
                text={"Company Type"}
                value={type}
                name="type"
                id="type"
                array={companyType}
                onChange={(e) => setType(e.target.value)}
                required={true}
              />
              <Input
                laBel={"Address 1"}
                inputType="text"
                value={address}
                required
                onChange={(e) => setAdress(e.target.value)}
              />
              <Input
                laBel={"Address 2"}
                inputType="text"
                value={addresssec}
                required
                onChange={(e) => setAdressSec(e.target.value)}
              />
            </section>
            <section>
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ width: "max-content" }}>WhatsApp No</label>
                <TextareaAutosize
                  style={{ height: "5vh", padding: "15px" }}
                  value={number}
                  onChange={(e) => setNumbers(e.target.value)}
                />
              </div>
            </section>
            <section style={{ marginLeft: "20px" }}>
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
            </section>
          </div>
          <CustomButton text={"Add Saloon"}></CustomButton>
        </form>
      </div>
    </div>
  );
};

export default NewSalon;
