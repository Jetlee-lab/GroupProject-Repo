import React, { Children, useState, lazy } from "react"; // Importing React and the useState hook for state management
import { Link, useLocation, Outlet, useRoutes } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import { useRole } from "@/auth";
import { AppSidebar } from "@/components/dashboard/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Component, Outdent } from "lucide-react";

// const LandingPage = lazy(() => import("@/pages/LandingPage"));
const LecturerDashboard = lazy(() => import("@/components/LecturerDashboard"));
const LecturerReportsPage = lazy(() => import("@/pages/LecturerReportsPage"));
const LecturerEditIssueForm = lazy(() =>
  import("@/components/issues/LecturerEditIssueForm")
);
const AcademicRegistrarDashboard = lazy(() =>
  import("@/components/AcademicRegistrarDasboard")
);
const AcademicRegistrarReportsPage = lazy(() =>
  import("@/pages/AcademicRegistrarReportsPage")
);
const AssignIssue = lazy(() => import("@/components/issues/AssignIssue"));
const StudentDashboard = lazy(() => import("@/components/StudentDashboard"));
const StudentReportsPage = lazy(() => import("@/pages/StudentReportsPage"));
const StudentIssueForm = lazy(() =>
  import("@/components/issues/StudentIssueForm")
);
const NotificationsPage = lazy(() => import("@/pages/NotificationsPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
// const LogoutPage = lazy(() => import("@/pages/LogoutPage"));
const NotFound = lazy(() => import("@/pages/404"));
const UnknownError = lazy(() => import("@/pages/unknown-error"));


const dashboardRoutes = [
  {
    // index: true
    path: "",
    Component: DashboardLayout,
    children: [
      {
        path: "/notifications",
        Component: NotificationsPage,
      },
      {
        path: "/settings",
        Component: SettingsPage,
      },
      {
        path: "/lecturer-reports",
        Component: LecturerReportsPage,
      },
      {
        path: "/student-reports",
        Component: StudentReportsPage,
      },
      {
        path: "/registrar-reports",
        Component: AcademicRegistrarReportsPage,
      },
      {
        path: "/edit-issue-lecturer",
        Component: LecturerEditIssueForm,
      },

      {
        path: "/add-issue",
        Component: StudentIssueForm,
      },
      {
        path: "/assign-issue",
        Component: AssignIssue,
      },
      // {
      //   path: "/account/logout",
      //   Component: LogoutPage,
      // },
      {
        path: "*",
        Component: NotFound,
      }
    ],
  },
];

export default function Dashboard() {
  const routes = useRoutes(dashboardRoutes);
  return routes
}

export function DashboardLayout() {
  const role = useRole();
  const { pathname } = useLocation();
  // const role = "student";
  // const role = "lecturer";
  // const role = "registrar"
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar userRole={role} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{`${role?.charAt(0).toUpperCase()}${role?.slice(
                    1
                  )}`}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div> */}
          <div className="min-h-[100%] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            {(pathname == "/dashboard" &&
              (role === "student" ? (
                <StudentDashboard />
              ) : role === "lecturer" ? (
                <LecturerDashboard />
              ) : role === "registrar" ? (
                <AcademicRegistrarDashboard />
              ) : (
                <div className="flex justify-center">
                  <UnknownError error={<>Failed to load{" "}<strong>{role}</strong>...</>} />
                </div>
              ))) || <Outlet />}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
