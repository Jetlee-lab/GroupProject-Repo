import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import logo from './logo2.jpg'

function Header() {
  return (
    <>
    <div className="flex items-center justify-between bg-blue-300 text-white p-2 shadow-2xl z-50">
        {/* Logo */}
        <div className="flex items-center">
            <img src={logo} className="rounded-full" alt="logo" width={70} />
            <h2 className="font-bold ml-3 text-2xl">AITS</h2>
        </div>


        {/* Search Bar */}
        <input type="text" className="border-2 border-gray-300 text-gray-800 p-2 w-64 rounded-3xl outline-none" placeholder="Search..." />

        {/* Message */}
        <div>
          <h1 className="text-3xl">Welcome to AITS</h1>
        </div>

        {/* User Profile */}
        <div>
          <NotificationsIcon className="mx-2 cursor-pointer" />
          <AccountBoxIcon className="mx-2 cursor-pointer"  />
        </div>
        
      </div>
  
    </>
  );
}

export default Header;
