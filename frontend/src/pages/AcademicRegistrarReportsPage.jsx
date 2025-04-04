import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@/hooks"
import { fetchIssues, fetchUsers } from '@/lib/api';
import { STATUS_CLOSED, STATUS_OPEN, STATUS_ESCALATED, STATUS_RESOLVED, STATUS_INREVIEW } from '@/lib/constants';

const AcademicRegistrarReportsPage = () => {
const { isLoading: issuesLoading, isFetching: issuesFetching, error: issuesError, data: issuesData } = useQuery(fetchIssues)
  const { isLoading: userssLoading, isFetching: usersFetching, error: usersError, data: usersData } = useQuery(fetchUsers)

  if (issuesFetching || usersFetching) {
    return <>Fetching issues...</>
  } else if (issuesLoading || userssLoading) {
    return <>Loading data...</>
  } else if (issuesError || usersError) {
    return <>Ops something happend!</>
  }

  const issues = issuesData.data
  const users = usersData.data

  const handleSearchInput = (e) => {
    const searchValue = e.target.value;
    const filteredIssues = issues.filter((issue) =>
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
                      [ STATUS_INREVIEW, STATUS_ESCALATED,  STATUS_OPEN].includes(issue.status)
                        ? "bg-green-100 text-green-600"
                        : issue.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : issue.status === "Rejected"
                        ? "bg-red-100 text-red-600"
                        : issue.status === STATUS_OPEN
                        ? "bg-blue-100 text-blue-600"
                        : issue.status === STATUS_INREVIEW
                        ? "bg-purple-100 text-purple-600"
                        : issue.status === STATUS_CLOSED
                        ? "bg-indigo-100 text-indigo-600"
                        : ""
                    }`}
                  >
                    {issue.status}
                  </span>
                </td>
                {/*Displaying priority */}

                <td className="px-6 py-4">{users.filter(u => issue.owner == u.id)[0]?.email || "annon." }</td>
                <td className="px-6 py-4">{issue.date}</td>
                <td className="px-6 py-4">{users.filter(u => issue.assignee == u.id)[0]?.email || "N/A" }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcademicRegistrarReportsPage;
