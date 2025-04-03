import React, { useState } from "react";

import { Link } from "react-router-dom";

const AcademicRegistrarReportsPage = () => {
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
      lecturer: "Dr. Kato Musa", 
    },
    {
      id: 2,
      title: "Technical issue with AITS platform",
      category: "Technical",
      status: "Resolved",
      priority: "Medium",
      reportedBy: "Mukisa John",
      date: "14/03/2025",
      lecturer: "Dr. Nansubuga Sarah",
    },
    {
      id: 3,
      title: "Conflicting exam schedule",
      category: "Exams",
      status: "On Hold",
      priority: "Low",
      reportedBy: "Nakato Mary",
      date: "12/03/2025",
      lecturer: "Dr. Okello James",
    },
    {
      id: 4,
      title: "Course registration not updating",
      category: "Registration",
      status: "Pending",
      priority: "High",
      reportedBy: "Kizito Paul",
      date: "10/03/2025",
      lecturer: "Dr. Amani Grace",
    },
    {
      id: 5,
      title: "Library system login failure",
      category: "Technical",
      status: "On Hold",
      priority: "Medium",
      reportedBy: "Namulindwa Joan",
      date: "11/03/2025",
      lecturer: "Dr. Kiggundu David",
    },
    {
      id: 6,
      title: "Missing internship placement details",
      category: "Internship",
      status: "Resolved",
      priority: "High",
      reportedBy: "Ssebuguzi Brian",
      date: "09/03/2025",
      lecturer: "Dr. Nansubuga Mary",
    },
    {
      id: 7,
      title: "Timetable clashes for elective courses",
      category: "Scheduling",
      status: "Rejected",
      priority: "High",
      reportedBy: "Nabirye Susan",
      date: "08/03/2025",
      lecturer: "Dr. Martin Kiboko",
    },
    {
      id: 8,
      title: "Lecture hall double booking",
      category: "Facilities",
      status: "Resolved",
      priority: "Medium",
      reportedBy: "Mugisha Kevin",
      date: "07/03/2025",
      lecturer: "Dr. Muwanguzi Musa",

    },
    {
      id: 9,
      title: "Tuition payment not reflecting",
      category: "Finance",
      status: "Pending",
      priority: "High",
      reportedBy: "Kaggwa Daniel",
      date: "06/03/2025",
      lecturer: "Dr.Harmony Namukasa"
    },
    {
      id: 10,
      title: "Course instructor absent for two weeks",
      category: "Faculty",
      status: "On Hold",
      priority: "Low",
      reportedBy: "Namanya Rose",
      date: "05/03/2025",
      lecturer: "Dr. Kato Mukisa",
    },
    {
      id: 11,
      title: "Exam results missing on portal",
      category: "Results",
      status: "Resolved",
      priority: "High",
      reportedBy: "Tumusiime Edward",
      date: "04/03/2025",
      lecturer: "Dr. Kiggundu Mark",
    },
    {
      id: 12,
      title: "System crash during online test",
      category: "Technical",
      status: "Rejected",
      priority: "Low",
      reportedBy: "Ainembabazi Grace",
      date: "03/03/2025",
      lecturer: "Dr. Muwanguzi Sarah",
    },
    {
      id: 13,
      title: "No seats available in lecture hall",
      category: "Facilities",
      status: "On Hold",
      priority: "Medium",
      reportedBy: "Ssempala Joseph",
      date: "02/03/2025",
      lecturer: "Dr. Nakato Elizabeth",
    },
    {
      id: 14,
      title: "Delay in transcript processing",
      category: "Administration",
      status: "Pending",
      priority: "High",
      reportedBy: "Nakimuli Lydia",
      date: "01/03/2025",
      lecturer: "Dr. Kato Sarah",
    },
    {
      id: 15,
      title: "Portal access denied after fee payment",
      category: "Finance",
      status: "Resolved",
      priority: "Medium",
      reportedBy: "Bwambale Peter",
      date: "29/02/2025",
      lecturer: "Dr. Kiggundu Grace",
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
              <th className="px-6 py-3 text-left">ID</th>
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
