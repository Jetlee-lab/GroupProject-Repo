import React, { useState } from "react";
import { Link } from "react-router-dom";
import { STATUS_CLOSED, STATUS_OPEN, STATUS_ESCALATED, STATUS_RESOLVED, STATUS_REVIEW } from '@/lib/constants';

const AcademicRegistrarReportsPage = ({ issues, users }) => {
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
        {/*Button for assigning an issue */}
        <Link to="/assign-issue">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300">
            Assign Issue
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
              <th className="px-6 py-3 text-left">ISSUE ID</th>
              <th className="px-6 py-3 text-center">Title</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Reported By</th>
              <th className="px-6 py-3 text-left">Date Reported</th>
              <th className="px-6 py-3 text-left">Lecturer in charge</th>
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
                      issue.status === STATUS_CLOSED
                        ? "bg-green-100 text-green-600"
                        : issue.status === STATUS_OPEN
                        ? "bg-yellow-100 text-yellow-600"
                        : issue.status === STATUS_INREVIEW
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
                <td className="px-6 py-4">{issue.lecturer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcademicRegistrarReportsPage;
