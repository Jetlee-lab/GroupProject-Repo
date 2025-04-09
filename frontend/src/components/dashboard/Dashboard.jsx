import React, { useState } from "react"; // Importing React and the useState hook for state management
import { Link, useLocation, Outlet } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
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
import LecturerDashboard from "@/components/LecturerDashboard";
import AcademicRegistrarDashboard from "@/components/AcademicRegistrarDasboard";
import StudentDashboard from "@/components/StudentDashboard";
import { Outdent } from "lucide-react";

export default function DashboardLayout() {
  const role = useRole()
  const { pathname } = useLocation()
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
            { pathname.startsWith("/dashboard") && (role === "student" ? (
              <StudentDashboard />
            ) : role === "lecturer" ? (
              <LecturerDashboard />
            ) : (
              role === "registrar" ?
              <AcademicRegistrarDashboard /> : <div className="flex justify-center">Failed to load <strong>{role}</strong>... {":("}</div>
            )) || <Outlet />}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
