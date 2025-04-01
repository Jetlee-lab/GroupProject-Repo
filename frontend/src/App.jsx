import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HelpPage from "./pages/HelpPage";
import NotificationsPage from "./pages/NotificationsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import IssueForm from "./components/issues/IssueForm";
import AppLayout from "./components/common/AppLayout";
import LandingPage from "./pages/LandingPage";
import LecturerDashboard from "./components/LecturerDashboard";

function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  return (
    <Router>
      <Routes>
        <Route path="" element={<AppLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage darkMode={darkMode} toggleTheme={toggleTheme} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add-issue" element={<IssueForm />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/dashboard/lecturer" element={<LecturerDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
