import React, { useState, useEffect, lazy } from "react";
import {
  // AuthContextProvider,
  AuthChangeRedirector,
  AnonymousRoute,
  AuthenticatedRoute,
} from "./auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HelpPage from "./pages/HelpPage";
import NotificationsPage from "./pages/NotificationsPage";
import LecturerReportsPage from "./pages/LecturerReportsPage";
import StudentReportsPage from "./pages/StudentReportsPage";
import AcademicRegistrarReportsPage from "./pages/AcademicRegistrarReportsPage";
import SettingsPage from "./pages/SettingsPage";
import SignUpPage from "./pages/SignUpPage";
//import LoginPage from "./pages/LoginPage";
import StudentIssueForm from "./components/issues/StudentIssueForm";
import LecturerEditIssueForm from "./components/issues/LecturerEditIssueForm";
import AssignIssue from "./components/issues/AssignIssue";
import AppLayout from "./components/common/AppLayout";
import LecturerDashboard from "./components/LecturerDashboard";
import AcademicRegistrarDashboard from "./components/AcademicRegistrarDasboard";
import StudentDashboard from './components/StudentDashboard';
import Dashboard from "./components/dashboard/Dashboard";``
import LogoutPage from "./pages/LogoutPage"
import { useConfig } from "./auth/hooks";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner"

const HomePage = lazy(() => import("@/pages/HomePage"));
const Dashboard = lazy(() => import("@/components/dashboard/Dashboard"));
const Login = lazy(() => import("@/components/auth/Login"));
const SignUp = lazy(() => import("@/components/auth/SignUp"));
const AppLayout = lazy(() => import("@/components/common/AppLayout"));
const HelpPage = lazy(() => import("@/pages/HelpPage"));
const LogoutPage = lazy(() => import("./pages/LogoutPage"));


function createRouter(config) {
  return createBrowserRouter([
    {
      path: "",
      element: (
        <AuthChangeRedirector>
          <AppLayout />
        </AuthChangeRedirector>
      ),
      children: [
        {
          path: "",
          Component: HomePage,
        },
        
        /*{
          path: "/login",
          element: <AnonymousRoute><LoginPage /></AnonymousRoute>,
        },*/ {
          path: "/logout",
          element: <LogoutPage />,
        },
        
        {
          path: "/add-issue",
          element: <StudentIssueForm />,
        },
        {
          path: "/assign-issue",
          element: <AssignIssue />,
        },
                {
          path: "/help",
          element: <HelpPage />,
        },
       
      ],
    },
    {
      path: "/account/*",
      element: <AnonymousRoute />,
      children: [
        {
          path: "signup",
          Component: SignUp,
        },
        {
          path: "login",
          Component: Login,
        },
      ],
    },
    {
      element: <AuthenticatedRoute><Dashboard /></AuthenticatedRoute>,
      children: [
    {
      path: "/dashboard",
    },{
      path: "/notifications",
      element: <NotificationsPage />,
    },
    {
      path: "/settings",
      element: <SettingsPage />,
    },
    {
      path: "/lecturer-reports",
      element: <LecturerReportsPage />,
    },
    {
      path: "/student-reports",
      element: <StudentReportsPage />,
    },
    {
      path: "/registrar-reports",
      element: <AcademicRegistrarReportsPage />,
    },
    {
      path: "/edit-issue-lecturer",
      element: <LecturerEditIssueForm />,
    },
  ],
}

    // {
    //   path: "/dashboard",
    //   element: <Dashboard />
    // },
    {
      path: "/help",
      Component: HelpPage,
    },
  ]);
}

export function Router() {
  // If we create the router globally, the loaders of the routes already trigger
  // even before the <AuthContext/> trigger the initial loading of the auth.
  // state.
  const [router, setRouter] = useState(null);
  const config = useConfig();
  useEffect(() => {
    setRouter(createRouter(config));
  }, [config]);
  return router ? (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true, // Enable the future flag
        v7_relativeSplatPath: true, // Enables relative paths in nested routes
        // v7_fetcherPersist: true, // Retains fetcher state during navigation
        // v7_normalizeFormMethod: true, // Normalizes form methods (e.g., POST or GET)
        // v7_partialHydration: true, // Supports partial hydration for server-side rendering
        // v7_skipActionErrorRevalidation: true, // Prevents revalidation when action errors occur
      }}
    />
  ) : null;
}

export default function App() {
  return (
    // <AuthContextProvider>
    <Provider>
      <Router />
      <Toaster />
    </Provider>
    // </AuthContextProvider>
  );
}

