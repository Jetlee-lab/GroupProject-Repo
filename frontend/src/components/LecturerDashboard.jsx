import React, { useState } from "react";
import { Link } from "react-router-dom";


const LecturerDashboard = () => {
  const [issues, setIssues] = useState([
    { id: 1, title: "Missing course unit marks", status: "Pending", student: "Mulungi Martha", comment: "" },
    { id: 2, title: "Technical issue with AITS platform", status: "Resolved", student: "Mukisa John", comment: "" },
    { id: 3, title: "Conflicting exam schedule", status: "On Hold", student: "Nakato Mary", comment: "" },
  ]);

  const [courses, setCourses] = useState([
    { id: 101, name: "Computer Science 101", students: 120 },
    { id: 102, name: "Software Engineering", students: 95 },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === id ? { ...issue, status: newStatus } : issue
      )
    );
  };

  const handleCommentChange = (id, newComment) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === id ? { ...issue, comment: newComment } : issue
      )
    );
  };

  return (
    <div>
      
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Lecturer Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Manage Student Issues */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
            <h2 className="text-xl font-semibold mb-4">Manage Student Issues</h2>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Issue</th>
                  <th className="px-4 py-2">Student</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Comment</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue) => (
                  <tr key={issue.id} className="border-b">
                    <td className="px-4 py-2">{issue.id}</td>
                    <td className="px-4 py-2">{issue.title}</td>
                    <td className="px-4 py-2">{issue.student}</td>
                    <td className="px-4 py-2">
                      <select
                        className="border px-2 py-1 rounded-md"
                        value={issue.status}
                        onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="border px-2 py-1 rounded-md w-full"
                        value={issue.comment || ""}
                        onChange={(e) => handleCommentChange(issue.id, e.target.value)}
                        placeholder="Add comment"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                        Save
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Course Management */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
            <h2 className="text-xl font-semibold mb-4">Manage Courses</h2>
            <ul>
              {courses.map((course) => (
                <li key={course.id} className="border-b py-2">
                  {course.name} - {course.students} students
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <div className="flex space-x-4">
              <Link to="/profile" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Profile</Link>
              <Link to="/courses" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Courses</Link>
              <Link to="/notifications" className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition">Notifications</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;
