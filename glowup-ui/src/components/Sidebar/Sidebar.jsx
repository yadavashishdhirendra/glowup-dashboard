import React, { Fragment, useState } from "react";
import { ProSidebarProvider, Menu, MenuItem } from "react-pro-sidebar";
import Bookings from "@material-ui/icons/Book";
import MenuIcon from "@material-ui/icons/Menu";
import { GiTicket } from "react-icons/gi";
import { HiTicket, HiOutlineUserAdd } from "react-icons/hi";
import { AiFillShop, AiFillBank } from "react-icons/ai";
import {BsImages} from "react-icons/bs"
import LogoutIcon from "@material-ui/icons/LockOpen";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import GlowupLogo from "../Assets/Logo/rsz_glow_up_logo-04_1 1.png";
import { useDispatch } from "react-redux";
import { loadUser, logoutUser } from "../../actions/UserActions";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const openMenu = () => {
    setOpen(!open);
  };

  const logoutUserHandler = async () => {
    await dispatch(logoutUser());
    navigate("/");
    dispatch(loadUser());
  };

  return (
    <Fragment>
      <div>
        <button className="toggle-icon" onClick={() => openMenu()}>
          <MenuIcon />
        </button>
      </div>
      {open ? (
        <div className="relative-menu">
          <ProSidebarProvider
            image="https://azouaoui-med.github.io/react-pro-sidebar/static/media/bg2.de0153c5.jpg"
            collapsed={open}
          >
            <div className="glowup-sidebar-logo">
              <img src={GlowupLogo} alt="" />
            </div>
            <Menu iconShape="circle">
              <Link to="/">
                <MenuItem icon={<Bookings />}>Bookings</MenuItem>
              </Link>
              <Link to="/coupans">
                <MenuItem
                  icon={
                    <GiTicket style={{ color: "white", fontSize: "24px" }} />
                  }
                >
                  All Coupons
                </MenuItem>
              </Link>
              <Link to="/create-coupons">
                <MenuItem
                  icon={
                    <HiTicket style={{ color: "white", fontSize: "24px" }} />
                  }
                >
                  Create Coupon
                </MenuItem>
              </Link>
              <Link to="/salons">
                <MenuItem
                  icon={
                    <AiFillShop style={{ color: "white", fontSize: "24px" }} />
                  }
                >
                  Salons
                </MenuItem>
              </Link>
              <Link to="/new-account">
                <MenuItem
                  icon={
                    <HiOutlineUserAdd
                      style={{ color: "white", fontSize: "20px" }}
                    />
                  }
                >
                  Create Account
                </MenuItem>
              </Link>
              <Link to="/accounting">
                <MenuItem
                  icon={
                    <AiFillBank style={{ color: "white", fontSize: "24px" }} />
                  }
                >
                  Accounts
                </MenuItem>
              </Link>
              <Link to="/offer-images">
                <MenuItem
                  icon={
                    <BsImages style={{ color: "white", fontSize: "20px" }} />
                  }
                >
                  Add Offers Images
                </MenuItem>
              </Link>
            </Menu>
          </ProSidebarProvider>
          <div onClick={() => logoutUserHandler()} className="logout-session">
            <LogoutIcon />
            <div>Logout</div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default SideBar;
