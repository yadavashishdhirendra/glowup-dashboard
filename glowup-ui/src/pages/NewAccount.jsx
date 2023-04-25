import React, { useState } from "react";
import CustomButton from "../components/Button/Button";
import Input from "../components/Input/Input";
import SideBar from "../components/Sidebar/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const NewAccount = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const createUserHandler = async (e) => {
    e.preventDefault();
    if (!name || !phone || !password) {
      return alert("please fill all fields");
    }
    try {
      const { data } = await axios.post("/api/v2/new-user", {
        email,
        phone,
        password,
        name,
      });
      console.log(data)
      if (data?.done) {
            navigate(`/new-salon/${data?.newUser?._id}`)
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  return (
    <div>
      <SideBar />
      <div className="data-table-wrapper" style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
        <h1>Create New Account</h1>
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop:"20px"
          }}
          onSubmit={createUserHandler}
        >
          <Input
            value={name}
            laBel={"Name"}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            value={phone}
            laBel={"Phone"}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            value={email}
            laBel={"email"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            value={password}
            laBel={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <CustomButton text={"create"}></CustomButton>
        </form>
      </div>
    </div>
  );
};

export default NewAccount;
