import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../components/Sidebar/Sidebar";
import { addNewEmployeeAction } from "../actions/EmployeesAction";
const NewEmployee = () => {
  const { owner, id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [intime, setInTime] = useState("");
  const [outtime, setOutTime] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { creating, newEmployee, error } = useSelector(
    (state) => state.editEmployee
  );
  console.log(newEmployee, "new");
  const newEmployeeHandler = async (e) => {
    e.preventDefault();
    if (!firstName || !setFirstName || !intime || !outtime || !status) {
      toast("please fill All fields");
    } else {
      dispatch(
        addNewEmployeeAction(
          owner,
          firstName,
          lastName,
          intime,
          outtime,
          status
        )
      );
    }
  };
  useEffect(() => {
    if (newEmployee?._id) {
      toast(`${newEmployee?._id} is id of new employee`);
      navigate(`/saloon/${id}/services/${owner}`);
    }
    if (error) {
      toast(error);
    }
  }, [newEmployee?._id, navigate, owner, id, error]);
  return (
    <div>
      <SideBar />
      <div style={{ display: "flex" }}>
        <div className="data-table-wrapper">
          <ToastContainer
            position="top-center"
            hideProgressBar={true}
            theme="colored"
          />
          <Input
            laBel={"First Name"}
            inputType="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            laBel={"Last Name"}
            inputType="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            laBel={"In Time"}
            inputType="text"
            value={intime}
            onChange={(e) => setInTime(e.target.value)}
          />
          <Input
            laBel={"Out Time"}
            inputType="text"
            value={outtime}
            onChange={(e) => setOutTime(e.target.value)}
          />
          <Input
            laBel={"Status"}
            inputType="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <div className="login-btn">
            <button
              type="submit"
              disabled={creating ? true : false}
              onClick={newEmployeeHandler}
            >
              {creating ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEmployee;
