import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
function Header() {
  return (
    <>
      <div className="flex items-centre"></div>
      {/*Search bar goes here*/}
      <input type="text" placeholder="Search..." />
      {/*welcome user name goes here*/}
      <h1>welcome</h1>

      {/*user profile dropdown*/}
      <div>
        <NotificationsIcon />
        <AccountBoxIcon />
        <SettingsIcon />
      </div>
    </>
  );
}

export default Header;
