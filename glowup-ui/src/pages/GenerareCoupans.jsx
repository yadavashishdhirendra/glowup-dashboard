import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCoupanAction } from "../actions/CoupanActions";
import Input from "../components/Input/Input";
import SideBar from "../components/Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { fetchAllSaloonsAction } from "../actions/SaloonAction";
import Select from "react-dropdown-select";
import axios from "axios";
const GenerareCoupans = () => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [disPer, setDisPer] = useState(0);
  const [maxDis, setMaxDis] = useState(0);
  const [startDate, setStartState] = useState();
  const [endDate, setEndDate] = useState();
  const [gender, setGender] = useState([]);
  const [category, setCategory] = useState([]);
  const [fetched, setFetched] = useState([]);
  const [minAmount, setMinAmount] = useState();
  const [vendors, setVendors] = useState("");
  const [limit, setLimit] = useState(1);
  const [selectedVendors, setSelectedVen] = useState([]);
  const [resUse, setReUse] = useState(0);
  const { coupan, error } = useSelector((state) => state.newCoupan);
  const { saloons } = useSelector((state) => state.allSaloons);
  console.log(saloons)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serviceCtaegories = ["Female", "Male", "All"];
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/v2/categories");
      setFetched(data?.categories)
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createCoupanAction(
        name,
        description,
        maxDis,
        disPer,
        category,
        startDate,
        endDate,
        minAmount,
        resUse,
        vendors,
        selectedVendors,
        limit,
        gender
      )
    );
    if (coupan.code) {
      toast(`Coupan code ${coupan.code} is saved `);
      navigate("/coupans");
    }
  };
  useEffect(() => {
    if (error) {
      toast(error);
    }
    fetchCategories()
    dispatch(fetchAllSaloonsAction());
  }, [error, dispatch]);
  return (
    <div>
      <SideBar />
      <div style={{ display: "flex" }}>
        <ToastContainer
          position="top-center"
          hideProgressBar={true}
          theme="colored"
        />
        <div className="data-table-wrapper">
          <h1 style={{ textAlign: "center" }}>Create Coupans</h1>
          <form
            onSubmit={onSubmitHandler}
            style={{ height: "160vh", width: "100%" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div>
                <Input
                  laBel={"Name"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  htmlFor="Name"
                  name={"Name"}
                  inputType="text"
                  id="Name"
                  required={true}
                />
                <Input
                  laBel={"Description"}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  htmlFor="description"
                  name={"description"}
                  inputType="text"
                  id="description"
                  required={true}
                />
                <Input
                  laBel={"Discount Percentage"}
                  value={disPer}
                  onChange={(e) => setDisPer(e.target.value)}
                  htmlFor="disPer"
                  name={"disPer"}
                  inputType="number"
                  id="disPer"
                  min="0"
                  max="100"
                />
                <Input
                  laBel={"Max Discount in Rs"}
                  value={maxDis}
                  onChange={(e) => setMaxDis(e.target.value)}
                  htmlFor="maxDis"
                  name={"maxDis"}
                  inputType="number"
                  id="maxDis"
                  min="0"
                />
                <Input
                  laBel={"Min order amount"}
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  htmlFor="min_ord_am"
                  name={"min_ord_am"}
                  inputType="number"
                  id="min_ord_am"
                  min="0"
                  required={true}
                />
                <Input
                  laBel={"Usage Limit Per User"}
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  htmlFor="limit"
                  name={"limit"}
                  inputType="number"
                  id="limit"
                  min="0"
                  required={true}
                />
              </div>
              <div style={{ width: "200px" }}></div>
              <div>
                <div>
                  <label htmlFor="Gender">Gender</label>
                  <br />
                  <select
                    name="Gender"
                    id="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required={true}
                  >
                    {serviceCtaegories.map((cat) => (
                      <option value={cat} key={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="Category">Category</label>
                  <br />
                  <select
                    name="Category"
                    id="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required={true}
                  >
                    {fetched?.map(({category}) => (
                      <option value={category} key={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  laBel={"Start Date"}
                  value={startDate}
                  onChange={(e) => setStartState(e.target.value)}
                  htmlFor="start-date"
                  name={"start-date"}
                  inputType="date"
                  id="start-date"
                  required={true}
                />
                <Input
                  laBel={"End Date"}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  htmlFor="end-date"
                  name={"end-date"}
                  inputType="date"
                  id="end-date"
                  required={true}
                />
                <Input
                  laBel={"Re-usable After Days"}
                  value={resUse}
                  onChange={(e) => setReUse(e.target.value)}
                  htmlFor="re-use"
                  name={"re-use"}
                  inputType="number"
                  id="re-use"
                  required={true}
                />

                <div>
                  <label htmlFor="Vendors">All Vendors</label>
                  <br />
                  <select
                    name="Vendors"
                    id="vendors"
                    value={vendors}
                    onChange={(e) => setVendors(e.target.value)}
                    required
                  >
                    <option value=""></option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                {vendors === "no" && (
                  <div>
                    <Select
                      style={{
                        width: "400px",
                      }}
                      dropdownHeight="100px"
                      searchBy="name"
                      options={saloons?.length ? saloons : []}
                      labelField="name"
                      valueField="id"
                      dropdownPosition="bottom"
                      multi={true}
                      required
                      onChange={(values) =>
                        setSelectedVen(values?.map((val) => val.id))
                      }
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="login-btn">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GenerareCoupans;
