import React, { lazy, Suspense } from "react";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function Dashbord() {
  // const { user } = useAuth();
  const userRole = "registrar"; // Replace with logic to fetch the user's role dynamically

  const renderDashboard = () => {
    switch (userRole) {
      case "student":
        const StudentDashboard = lazy(
          () => import("@/pages/dashboards/student"),
        );

        return <StudentDashboard />;
      case "lecturer":
        const LecturerDashboard = lazy(
          () => import("@/pages/dashboards/lecturer"),
        );

        return <LecturerDashboard />;
      case "registrar":
        const RegistrarDashboard = lazy(
          () => import("@/pages/dashboards/registrar"),
        );

        return <RegistrarDashboard />;
      default:
        return <div>Role not recognized</div>;
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Dashboard</h1>
        </div>
        <Suspense fallback={<div>Loading {userRole} dashboard...</div>}>
          {renderDashboard()}
        </Suspense>
      </section>
    </DefaultLayout>
  );
}
