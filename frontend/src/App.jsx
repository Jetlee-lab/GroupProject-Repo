<<<<<<< HEAD
// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; // Import the Home page
import Dashboard from "./components/Dashboard"; // Import the Dashboard components
import Login from "./components/Login"; // Import the Login component
import Contact from "./pages/Contact"; // Import the Contact page
import About from "./pages/About"; // Import the About page
import Colleges from "./pages/Colleges"; // Import the Colleges page


function App() {
  return (
    <Router>
      {/* Define routes for the application */}
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Dashboard Page */}
        <Route path="/dashboard" element={<Dashboard userRole="student" />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

         {/* Contacts */}
         <Route path="/contacts" element={<Contact />} />

         {/* About */}
         <Route path="/about" element={<About />} />

         {/* Collegea */}
         <Route path="/colleges" element={<Colleges />} />
      </Routes>
    </Router>
  );
}

export default App;
=======
import React, { useState, useEffect } from "react";
import {
  AuthContextProvider,
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
import LoginPage from "./pages/LoginPage";
import StudentIssueForm from "./components/issues/StudentIssueForm";
import LecturerEditIssueForm from "./components/issues/LecturerEditIssueForm";
import AssignIssue from "./components/issues/AssignIssue";
import AppLayout from "./components/common/AppLayout";
import LandingPage from "./pages/LandingPage";
import LecturerDashboard from "./components/LecturerDashboard";
import AcademicRegistrarDashboard from "./components/AcademicRegistrarDasboard";
import StudentDashboard from './components/StudentDashboard';
import Dashboard from "./components/dashboard/Dashboard";``
import LogoutPage from "./pages/LogoutPage"
import { useConfig } from "./auth/hooks";
import Login from "@/components/auth/Login"

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
          element: <HomePage />,
        },
        {
          path: "/landing",
          element: <LandingPage />,
        },
        {
          path: "/login",
          element: <AnonymousRoute><LoginPage /></AnonymousRoute>,
        }, {
          path: "/logout",
          element: <LogoutPage />,
        },
        {
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
      element: <AnonymousRoute/>,
      children: [
        {
          path: "signup",
          element: <SignUpPage/>,
        },
        {
          path: "login",
          element: <Login/>
        }
      ]
    },
    {
      element: <AuthenticatedRoute />,
      children: [
    {
      path: "/dashboard",
      element: <Dashboard />
    },
  ],
}

// {
//   path: "/dashboard",
//   element: <Dashboard />
// },
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
  return router ? <RouterProvider router={router} /> : null;
}

export default function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}
>>>>>>> frontend
