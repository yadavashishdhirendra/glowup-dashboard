import React from "react";

const SelectDropDown = ({ value, onChange, text, array, ...other }) => {
  return (
    <div>
      <label htmlFor="Day">{text}</label>
      <br />
      <select value={value} onChange={onChange} {...other}>
        <option value={""} key={""}></option>
        {array.map((cat) => (
          <option value={cat} key={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropDown;
