import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  editCoupanAction,
  fetchSingleCoupanAction,
} from "../actions/CoupanActions";
import Input from "../components/Input/Input";
import SideBar from "../components/Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { fetchAllSaloonsAction } from "../actions/SaloonAction";
import Select from "react-dropdown-select";
import axios from "axios";
import { EDIT_COUPAN_RESET } from "../constants/CoupanConstansts";
import CustomButton from "../components/Button/Button";
const EditCoupan = () => {
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
  const { id } = useParams();
  const dispatch = useDispatch();
  const { saloons } = useSelector((state) => state.allSaloons);
  const { coupan, error: coupanEr } = useSelector(
    (state) => state.singleCoupan
  );
  const { done, updating, error } = useSelector((state) => state.editCoupan);
  const serviceCtaegories = ["Female", "Male", "All"];
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/v2/categories");
      setFetched(data?.categories);
    } catch (error) {
      toast(error.response.data);
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let data = {
      name,
      category,
      gender,
      maxDiscount: maxDis,
      discountPercentage: disPer,
      min_amount: minAmount,
      description,
      valid_from: startDate,
      valid_till: endDate,
      usage_limit: limit,
      time_period: resUse,
      all_vendors: vendors,
      selected_vendors: vendors.toLowerCase() === "yes" ? [] : selectedVendors,
    };
    confirmAlert({
      title: "Update Salon?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(editCoupanAction(id, data)),
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
    dispatch(fetchSingleCoupanAction(id));
    dispatch(fetchAllSaloonsAction());
    fetchCategories();
  }, [id, dispatch]);
  useEffect(() => {
    setName(coupan?.name);
    setDescription(coupan?.description);
    setCategory(coupan?.category);
    setGender(coupan?.gender);
    setMaxDis(coupan?.maxDiscount);
    setDisPer(coupan?.discountPercentage);
    setMinAmount(coupan?.min_amount);
    setLimit(coupan?.usage_limit);
    setStartState(coupan?.valid_from);
    setEndDate(coupan?.valid_till);
    setVendors(coupan?.all_vendors);
    setReUse(coupan?.time_period);
  }, [coupan]);
  useEffect(() => {
    if (done) {
      dispatch(fetchSingleCoupanAction(id));
      dispatch({ type: EDIT_COUPAN_RESET });
      toast("Coupan updated");
    }
    if (error) {
      toast(error);
    }
    if (coupanEr) {
      toast(coupanEr);
    }
  }, [dispatch, done, error, id, coupanEr]);
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
          <h1 style={{ textAlign: "center" }}>Edit Coupan</h1>
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
                    <option value={""}></option>
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
                    <option value={""} key={""}></option>
                    {fetched?.map(({ category }) => (
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
                      dropdownHeight="400px"
                      values={coupan?.selected_vendors}
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
            <CustomButton
              text={"Update Coupan"}
              loading={updating}
              disabled={updating}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCoupan;
