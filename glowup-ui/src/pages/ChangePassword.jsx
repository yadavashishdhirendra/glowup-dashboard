import React, { useEffect, useState } from "react";
import SideBar from "../components/Sidebar/Sidebar";
import Input from "../components/Input/Input";
import CustomButton from "../components/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MetaTitle from "../components/MetaTitle/MetaTitle";
const ChangePassword = () => {
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [response, setResponse] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const passwordHandler = (e) => {
    e.preventDefault();
    if (password !== password2) {
      return toast("Password not Matched");
    } else if (!password || !password2) {
      return toast("Password cannot be blank");
    } else {
      confirmAlert({
        title: "Update Password",
        message: "Are you sure to do this?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              try {
                const { data } = await axios.put(
                  `/api/v2/change-password/${id}`,
                  { password }
                );
                setResponse(data.updated);
              } catch (err) {
                setError(err.response.data.error);
              }
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
    }
  };
  useEffect(() => {
    if (response) {
      toast("Password Changes");
      setResponse(null);
      navigate("/all-users");
    }
    if (error) {
      toast(error);
    }
  }, [response, error, navigate]);
  return (
    <div>
      <MetaTitle title={`Change Password-${id}`} />
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
        <h1>Change Password</h1>
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "20px",
          }}
          onSubmit={passwordHandler}
        >
          <Input
            value={password}
            laBel={"Password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            value={password2}
            laBel={"Re-Type Password"}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <CustomButton text={"Change Password"}></CustomButton>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
