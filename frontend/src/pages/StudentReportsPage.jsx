import React, { useState } from "react";
import { Link } from "react-router-dom";

const StudentReportsPage = () => {
  /*Initializing the 'issues' state with an array of objects representing different academic issues.  
Each issue contains information about:
-id: A unique identifier for the issue
-title: A brief description of the issue
-category: The type of issue (that is to say; Course Material, Exams, Technical)
-status: The current status of the issue (that is to say; In Progress, Resolved, Open)
-priority: The priority level of the issue (that is to say; High, Medium, Low)
-reportedBy: The name of the person who reported the issue
-date: The date the issue was reported
 This state will be used to render a list of issues on the page and can be updated as necessary.*/

  const initIssues = [
    {
      id: 1,
      title: "Missing course unit marks",
      category: "Course Material",
      status: "Pending",
      priority: "High",
      reportedBy: "Mulungi Martha",
      date: "15/03/2025",
    },
    {
      id: 2,
      title: "Technical issue with AITS platform",
      category: "Technical",
      status: "Resolved",
      priority: "Medium",
      reportedBy: "Mulungi Martha",
      date: "14/03/2025",
    },
    {
      id: 3,
      title: "Conflicting exam schedule",
      category: "Exams",
      status: "On Hold",
      priority: "Low",
      reportedBy: "Mulungi Martha",
      date: "12/03/2025",
    },
    
    {
      id: 4,
      title: "Timetable clashes for elective courses",
      category: "Scheduling",
      status: "Rejected",
      priority: "High",
      reportedBy: "Mulungi Martha",
      date: "08/03/2025",
    },
    
    {
      id: 5,
      title: "Tuition payment not reflecting",
      category: "Finance",
      status: "Pending",
      priority: "High",
      reportedBy: "Mulungi Martha",
      date: "06/03/2025",
    },
    {
      id: 6,
      title: "Course instructor absent for two weeks",
      category: "Faculty",
      status: "On Hold",
      priority: "Low",
      reportedBy: "Mulungi Martha",
      date: "05/03/2025",
    },
    {
      id: 7,
      title: "Exam results missing on portal",
      category: "Results",
      status: "Resolved",
      priority: "High",
      reportedBy: "Mulungi Martha",
      date: "04/03/2025",
    },

  ];

  const [issues, setIssues] = useState(initIssues);

  const handleSearchInput = (e) => {
    const searchValue = e.target.value;
    const filteredIssues = initIssues.filter((issue) =>
      issue.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setIssues(filteredIssues);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-semibold text-black-800 mb-6">
        Reported Academic Issues
      </h1>
      <div className="flex justify-between mb-4">
        {/*Button for editing an issue */}
        <Link to="/dashboard/add-issue">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300">
            Add New Issue
          </button>
        </Link>
        {/*Search input field */}
        <input
          onChange={handleSearchInput}
          type="text"
          placeholder="Search Issues..."
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black  border-gray-300 p-2 w-64  outline-none  "
        />
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {/*Table for displaying issues */}
        <table className="min-w-full table-auto border-separate border-spacing-0">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-center">Title</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Reported By</th>
              <th className="px-6 py-3 text-left">Date Reported</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4">{issue.id}</td>
                <td className="px-6 py-4">{issue.title}</td>
                <td className="px-6 py-4">{issue.category}</td>
                <td className="px-6 py-4">
                  {/*Display status with different colors */}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      issue.status === "Resolved"
                        ? "bg-green-100 text-green-600"
                        : issue.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : issue.status === "On Hold"
                        ? "bg-gray-100 text-gray-600"
                        : issue.status === "Rejected"
                        ? "bg-red-100 text-red-600"
                        : issue.status === "Open"
                        ? "bg-blue-100 text-blue-600"
                        : issue.status === "In Progress"
                        ? "bg-purple-100 text-purple-600"
                        : issue.status === "Closed"
                        ? "bg-indigo-100 text-indigo-600"
                        : ""
                    }`}
                  >
                    {issue.status}
                  </span>
                </td>
                {/*Displaying priority */}

                <td className="px-6 py-4">{issue.reportedBy}</td>
                <td className="px-6 py-4">{issue.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentReportsPage;
