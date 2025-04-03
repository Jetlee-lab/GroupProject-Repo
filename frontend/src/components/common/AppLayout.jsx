<<<<<<< HEAD
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';
// import { useUser } from '../context/UserContext';

function AppLayout() {
  const location = useLocation();
  
  // Access user role from UserContext
  // const { userRole } = useUser(); // Now using the userRole from context
  const userRole = null
  
=======
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar"; 

function AppLayout() {
  const location = useLocation();

>>>>>>> 90908f9924ae6d60c310aecd8a30c60950b6a865
  // Check if the current path is one of the excluded pages
  const excludedPaths = ["/", "/login", "/signup"];
  const shouldShowSidebar = !excludedPaths.includes(location.pathname);

  return (
    <div
      className={`grid ${
        shouldShowSidebar
          ? "grid-cols-[210px_auto] grid-rows-[1fr_auto]"
          : "grid-rows-[1fr_auto]"
      } h-dvh overflow-hidden`}
    >
      <Header />
<<<<<<< HEAD
      {shouldShowSidebar && <SideBar userRole={userRole} />} {/* Pass userRole to SideBar */}
      <main className={`${shouldShowSidebar ? 'col-start-2' : ''} overflow-y-scroll  border-2 border-amber-900`}>
=======
      {shouldShowSidebar && <SideBar />} 
      {/* Render the sidebar only if not on excluded pages */}
      <main className={`${shouldShowSidebar ? "col-start-2" : ""} overflow-y-scroll`}>
>>>>>>> 90908f9924ae6d60c310aecd8a30c60950b6a865
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
