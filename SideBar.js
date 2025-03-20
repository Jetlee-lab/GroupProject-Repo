import React from "react";
import SideBarItem from "./SideBarItem";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/Help";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <div className="bg-green-300 text-white w-60 h-screen shadow-2xl z-40">
        <Link to="/">
          <SideBarItem Icon={HomeIcon} text={"Home"} />
        </Link>
        <Link to="/reports">
          <SideBarItem Icon={AssessmentIcon} text={"Reports"} />
        </Link>
        <Link to="/notifications">
          <SideBarItem Icon={NotificationsIcon} text={"Notifications"} />
        </Link>
        <Link to="/settings">
          <SideBarItem Icon={SettingsRoundedIcon} text={"Settings"} />
        </Link>
        <SideBarItem Icon={LogoutIcon} text={"Logout"} />
        <Link to="/help">
          <SideBarItem Icon={HelpIcon} text={"Help"} />
        </Link>
      </div>
    </>
  );
};

export default SideBar;
