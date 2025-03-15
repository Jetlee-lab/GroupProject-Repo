// src/components/RegistrarDashboad

            // src/components/RegistrarDashboard.js
import React, { useState, useEffect } from "react";
import IssueList from "./Issuelist";
import Navbar from "./Navbar";

const RegistrarDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8000/api/issues/?status=${filter}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIssues(response.data);
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };
    fetchIssues();
  }, [filter]);

  const handleAssign = async (issueId, lecturerId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(
        `http://localhost:8000/api/issues/${issueId}/assign/`,
        { lecturerId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Issue assigned successfully!");
    } catch (error) {
      console.error("Error assigning issue:", error);
    }
  };

  const handleResolve = async (issueId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(
        `http://localhost:8000/api/issues/${issueId}/resolve/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Issue resolved successfully!");
    } catch (error) {
      console.error("Error resolving issue:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Registrar Dashboard</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Filter by Status</label>
          <select
            className="w-full p-2 border rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="open">Open</option>
            <option value="assigned">Assigned</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <IssueList issues={issues} onAssign={handleAssign} onResolve={handleResolve} />
      </div>
    </div>
  );
};

export default RegistrarDashboard;