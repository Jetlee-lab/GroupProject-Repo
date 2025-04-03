import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Dashboard from "./components/Dashboard";``
import LogoutPage from "./pages/LogoutPage"
import { useConfig } from "./auth/hooks";

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
          path: "/signup",
          element: <AnonymousRoute><SignUpPage /></AnonymousRoute>,
        },
        {
          path: "/login",
          element: <AnonymousRoute><LoginPage /></AnonymousRoute>,
        }, {
          path: "/logout",
          element: <AnonymousRoute><LogoutPage /></AnonymousRoute>,
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
          path: "/lecturer-dashboard",
          element: <LecturerDashboard />,
        },
        {
          path: "/registrar-dashboard",
          element: <AcademicRegistrarDashboard />,
        },
        {
          path: "/help",
          element: <HelpPage />,
        },
        {
          path:"/student-dashboard",
          element: <StudentDashboard />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />
        }
      ],
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
  return router ? <RouterProvider router={router} /> : null;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<AppLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/lecturer-reports" element={<LecturerReportsPage/>} />
          <Route path="/student-reports" element={<StudentReportsPage/>} />
          <Route path="/registrar-reports" element={<AcademicRegistrarReportsPage/>} />
          <Route path="/settings" element={<SettingsPage/>} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/edit-issue-lecturer" element={<LecturerEditIssueForm />} />
          <Route path="/add-issue" element={<StudentIssueForm />} />
          <Route path="/assign-issue" element={<AssignIssue />} />
          <Route path="/lecturer-dashboard" element={<LecturerDashboard />} />
          <Route path="/registrar-dashboard" element={<AcademicRegistrarDashboard />} />
          <Route path="/student-dashboard" element={<Student_dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

// <Router>
// <Routes>
//   <Route path="" element={<AppLayout />}>
//     <Route path="" element={<HomePage />} />
//     <Route path="/help" element={<HelpPage />} />
//     <Route path="/notifications" element={<NotificationsPage />} />
//     <Route path="/lecturer-reports" element={<LecturerReportsPage/>} />
//     <Route path="/student-reports" element={<StudentReportsPage/>} />
//     <Route path="/registrar-reports" element={<AcademicRegistrarReportsPage/>} />
//     <Route path="/settings" element={<SettingsPage/>} />
//     <Route path="/signup" element={<SignUpPage />} />
//     <Route path="/login" element={<LoginPage />} />
//     <Route path="/landing" element={<LandingPage />} />
//     <Route path="/edit-issue-lecturer" element={<LecturerEditIssueForm />} />
//     <Route path="/add-issue" element={<StudentIssueForm />} />
//     <Route path="/assign-issue" element={<AssignIssue />} />
//     <Route path="/lecturer-dashboard" element={<LecturerDashboard />} />
//     <Route path="/registrar-dashboard" element={<AcademicRegistrarDashboard />} />
//     <Route path="/student-dashboard" element={<Student_dashboard />} />
//   </Route>
// </Routes>
// </Router>