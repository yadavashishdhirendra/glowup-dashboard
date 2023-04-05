import React from "react";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
const MenuData = ({ Icon, text, path }) => {
  return (
    <Link to={path}>
      <MenuItem icon={<Icon style={{ color: "white", fontSize: "24px" }} />}>
        {text}
      </MenuItem>
    </Link>
  );
};

export default MenuData;
