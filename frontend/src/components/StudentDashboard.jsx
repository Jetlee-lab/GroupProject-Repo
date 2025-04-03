<<<<<<< HEAD
// src/components/StudentDashboard.js
// src/components/StudentDashboard.js
import React, { useState, useEffect } from "react";

import IssueForm from "./IssueForm";


import Notifications from "./Notifications";
import Navbar from "./Navbar";


const StudentDashboard = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8000/api/issues/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIssues(response.data);
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };
    fetchIssues();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Log a New Issue</h2>
            <IssueForm />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
            <h2 className="text-xl font-semibold mb-4">Issue Tracking</h2>
            
            <ul>
              {issues.map((issue) => (
                <li key={issue.id}>{issue.title}</li>
              ))}
            </ul>
          </div>
        </div>
        <Notifications />
=======
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Link } from "react-router-dom"; // Import Link for navigation

const StudentDashboard = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Simulate fetching student activities
    const mockActivities = [
      { id: 1, course: "Mathematics", activity: "Assignment 1", dueDate: "2025-04-01" },
      { id: 2, course: "Physics", activity: "Lab Report", dueDate: "2025-04-05" },
    ];
    setActivities(mockActivities);
  }, []);

  const handleReportIssue = () => {
    // Navigate to the issue reporting form
    navigate("/add-issue");
    
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <h2 className="text-xl font-semibold mb-2">Upcoming Activities</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id} className="mb-2">
            <strong>{activity.course}:</strong> {activity.activity} (Due: {activity.dueDate})
          </li>
        ))}
      </ul>

        {/* Button to Student Reports Page */}
      <div className="mt-4 text-left">
          <Link to="/student-reports"> <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"> View and Add Issues</button> </Link>
        </div>        

      {/* Report Issue Button */}
      <div className="mt-6">
        <button
          onClick={handleReportIssue}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
        >
          Report Issue
        </button>
>>>>>>> frontend
      </div>
    </div>
  );
};

export default StudentDashboard;