import React, { Children, useState, lazy } from "react"; // Importing React and the useState hook for state management
import {
  Link,
  useLocation,
  Outlet,
  useRoutes,
  Navigate,
  useNavigate,
  useLoaderData,
} from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import { useActiveRole, useRoles } from "@/hooks/use-auth";
import { AppSidebar } from "@/components/dashboard/components/app-sidebar";
import { Button } from "@/components/ui/button";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { LoaderIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Component, Outdent, CircleUserRound } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { ROLE_STUDENT, ROLE_LECTURER, ROLE_REGISTRAR } from "@/lib/constants";

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
const GeneratedTokensPage = lazy(() => import("@/pages/generated-tokens"));
import { useQuery } from "@tanstack/react-query";
import {
  fetchIssues,
  fetchUsers,
  fetchStats,
  fetchIssuesMeta,
} from "@/lib/api";
import { Search } from "@/components/search";
import { useDispatch } from "react-redux";
import { setMeta as setIssuesMeta } from "@/redux/features/issuesSilce";
import { DashboardFooter } from "@/components/footer";
import Timeline from "@/components/timeline";

const dashboardRoutes = [
  {
    // index: true
    path: "",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
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
        path: "/issue/:issueId",
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
      {
        path: "/generated-tokens",
        Component: GeneratedTokensPage,
      },
      // {
      //   path: "/account/logout",
      //   Component: LogoutPage,
      // },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
];

export default function DashboardRoutes() {
  const routes = useRoutes(dashboardRoutes);
  return routes;
}

export function DashboardLayout() {
  const {
    error: issuesMetaError,
    data: issuesMetaRes,
    isFetching: issuesMetaFetching,
  } = useQuery({
    queryKey: ["issues", "meta"],
    queryFn: () => fetchIssuesMeta(),
  });
  const dispatch = useDispatch();
  const roles = useRoles();
  const [{ name: role }, setActiveRole] = useActiveRole();
  // const { pathname } = useLocation();
  const switchRole = (role) => setActiveRole(role);
  const navigate = useNavigate();
  const location = useLocation();
  const handleRoleChange = (role) => {
    // alert()
    // location.reloa
    setActiveRole(role);
    // navigate(`/dashboard`);
  };

  if (issuesMetaFetching) {
    return null;
  }
  if (issuesMetaError) {
    return <UnknownError error="Failed Loading resource." />;
  } else if (issuesMetaRes) {
    dispatch(setIssuesMeta(issuesMetaRes.data));
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar userRoles={roles} onRoleChange={handleRoleChange} />
      <SidebarInset>
        {/* <div className="sticky top-0 bg-gradient-to-r from-blue-100 to-green-200"> */}
        <header className="flex sticky top-0 z-11 min-h-14 p-4 backdrop-blur-3xl  bg-gradient-to-r from-blue-400 to-blue-600">
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
                  <BreadcrumbPage>{`${role
                    ?.charAt(0)
                    .toUpperCase()}${role?.slice(1)}`}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Search />
          </div>
          <div className="flex flex-row gap-x-4 ml-auto">
            <RoleSwitcher role={role} onChange={switchRole} />
          </div>
        </header>
        <Separator orientation="horizontal" />
        <div>
          <div className="flex flex-col lg:fixed lg:flex-row h-full pb-16">
            <div className="flex flex-3 flex-col gap-5 p-2 pt-0 lg:overflow-auto h-full">
              <div className="min-h-[100%] flex-1 rounded-xl bg-muted/50 bg-gradient-to-r from-blue-100 to-blue-300 md:min-h-min">
                <Outlet />
              </div>
              <footer>
                <DashboardFooter />
              </footer>
            </div>
            <div className="flex flex-col gap-6 flex-1 p-5 pr-2 overflow-auto h-full">
              <Timeline />
              <CalendarDemo />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function CalendarDemo() {
  // const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [date, setDate] = React.useState(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow h-fit"
    />
  );
}

export function Dashboard() {
  const [{ name: role }, setRole] = useActiveRole();
  const [statsParams, setStatParams] = useState({}); // ({ priority: '' });
  const {
    isPending: statsPending,
    error: statsError,
    data: statsRes,
    isFetching: statsFetching,
  } = useQuery({
    queryKey: ["stats", statsParams],
    queryFn: () => fetchStats({ stat: "issues", params: statsParams }),
  });
  const {
    isPending: issuesPending,
    error: issuesError,
    data: issuesRes,
    isFetching: issuesFetching,
  } = useQuery({
    queryKey: ["issues"],
    queryFn: () => fetchIssues(),
  });
  const {
    isPending: usersPending,
    error: usersError,
    data: usersRes,
    isFetching: usersFetching,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });

  if (statsError || usersError) {
    console.log({ statsError, issuesError, usersError });
    return <UnknownError error="Failed Loading resource." />;
  } else if (statsFetching) {
    // return <>Fetching issues...</>;
  } else if (statsPending) {
    // return <>Loading data...</>;
  }

  if (issuesFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderIcon size={48} className="animate-spin" />
      </div>
    );
  }

  const stats = {
    data: statsRes?.data,
    fetching: statsFetching,
    pending: statsPending,
    error: statsError,
  };
  const issues = {
    data: issuesRes?.data,
    fetching: issuesFetching,
    pending: issuesPending,
    error: issuesError,
  };
  const users = {
    data: usersRes?.data,
    fetching: usersFetching,
    pending: usersPending,
    error: usersError,
  };
  switch (role) {
    case ROLE_STUDENT:
      return <StudentDashboard stats={stats} issues={issues} users={users} />;
    case ROLE_LECTURER:
      return <LecturerDashboard stats={stats} issues={issues} users={users} />;
    case ROLE_REGISTRAR:
      return (
        <AcademicRegistrarDashboard
          stats={stats}
          issues={issues}
          users={users}
        />
      );
    default:
      return (
        <div className="flex justify-center">
          <UnknownError
            error={
              <>
                Failed to load <strong>{role}</strong>...
              </>
            }
          />
        </div>
      );
  }
}

export function RoleSwitcher({ role, onChange }) {
  const [open, setOpen] = React.useState(false);
  // const [selectedRole, setSelectedRole] = React.useState(null);
  const roles = useRoles();
  // console.log("RoleSwitcher", { role, roles, onChange });

  return (
    <div className="flex items-center space-x-4 mr-3">
      {/* <p className="text-sm text-muted-foreground">Status</p> */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[32px] h-[32px] justify-center overflow-clip rounded-2xl"
          >
            {/* {role ? <>{role}</> : null} */}
            <CircleUserRound size={24} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="left" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No Roles Found.</CommandEmpty>
              <CommandGroup>
                {roles.map((role) => (
                  <CommandItem
                    key={role.id}
                    value={role.name}
                    onSelect={(value) => {
                      onChange(
                        roles.find((role) => role.name === value) || null
                      );
                      setOpen(false);
                      // onChange(role);
                    }}
                  >
                    {role.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
