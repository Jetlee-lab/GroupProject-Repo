import { Outlet } from "react-router-dom";

export default function AccountLayout({ children }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      {children || <Outlet />}
    </div>
  );
}
