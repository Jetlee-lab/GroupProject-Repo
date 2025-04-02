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


function App() {
  
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
         
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
