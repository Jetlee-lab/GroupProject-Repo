import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

function AppLayout() {
  return (
    <div className="grid grid-cols-[210px_auto] grid-rows-[1fr_auto] h-dvh overflow-hidden">
      <Header />
      <SideBar />
      <main className="overflow-y-scroll col-start-2 row-start-2">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
