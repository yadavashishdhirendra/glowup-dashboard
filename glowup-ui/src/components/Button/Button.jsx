import React from "react";

const CustomButton = ({ disabled, loading, text, ...otherProps }) => {
  return (
    <div className="login-btn">
      <button type="submit" disabled={disabled} {...otherProps}>
        {loading ? "..." : text }
      </button>
    </div>
  );
};

export default CustomButton;
