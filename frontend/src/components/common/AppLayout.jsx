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
  
  // Check if the current path is one of the excluded pages
  const excludedPaths = ['/', '/login', '/signup'];
  const shouldShowSidebar = !excludedPaths.includes(location.pathname);

  return (
    <div
      className={`grid ${
        shouldShowSidebar
          ? 'grid-cols-[210px_auto] grid-rows-[1fr_auto]'
          : 'grid-rows-[1fr_auto]'
      } h-dvh overflow-hidden`}
    >
      <Header />
      {shouldShowSidebar && <SideBar userRole={userRole} />} {/* Pass userRole to SideBar */}
      <main className={`${shouldShowSidebar ? 'col-start-2' : ''} overflow-y-scroll  border-2 border-amber-900`}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

