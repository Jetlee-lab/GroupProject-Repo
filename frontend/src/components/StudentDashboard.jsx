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
      </div>
    </div>
  );
};

export default StudentDashboard;