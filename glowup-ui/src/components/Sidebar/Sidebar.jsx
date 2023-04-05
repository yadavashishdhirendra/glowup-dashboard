import React, { Fragment, useState } from "react";
import { ProSidebarProvider, Menu} from "react-pro-sidebar";
import Bookings from "@material-ui/icons/Book";
import MenuIcon from "@material-ui/icons/Menu";
import {FaUserSecret} from "react-icons/fa"
import { GiTicket } from "react-icons/gi";
import { HiTicket, HiOutlineUserAdd } from "react-icons/hi";
import { AiFillShop, AiFillBank } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import LogoutIcon from "@material-ui/icons/LockOpen";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import GlowupLogo from "../Assets/Logo/rsz_glow_up_logo-04_1 1.png";
import { useDispatch } from "react-redux";
import { loadUser, logoutUser } from "../../actions/UserActions";
import MenuData from "../MenuData/MenuData";

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
              <img src={GlowupLogo} alt="glowup-logo" />
            </div>
            <Menu iconShape="circle">
              <MenuData Icon={Bookings} path={"/"} text={"Bookings"} />
              <MenuData
                Icon={GiTicket}
                path={"/coupans"}
                text={"All Coupans"}
              />
              <MenuData
                Icon={HiTicket}
                path={"/create-coupons"}
                text={"Create Coupans"}
              />
              <MenuData
                Icon={HiOutlineUserAdd}
                path={"/new-account"}
                text={"Create Account"}
              />
              <MenuData
                Icon={FaUserSecret}
                path={"/all-users"}
                text={"Users"}
              />
              <MenuData Icon={AiFillShop} path={"/salons"} text={"Salons"} />
              <MenuData
                Icon={AiFillBank}
                path={"/accounting"}
                text={"Accounts"}
              />
              <MenuData
                Icon={BsImages}
                path={"/offer-images"}
                text={"Add offers Images"}
              />
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
