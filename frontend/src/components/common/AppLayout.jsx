import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar"; 

function AppLayout() {
  const location = useLocation();

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
      {shouldShowSidebar && <SideBar />} 
      {/* Render the sidebar only if not on excluded pages */}
      <main className={`${shouldShowSidebar ? "col-start-3" : ""} overflow-y-scroll`}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
