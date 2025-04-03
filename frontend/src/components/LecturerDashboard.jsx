import React, { useState } from "react";  // Importing React and the useState hook for state management
import { Link } from "react-router-dom";  // Importing Link component from react-router-dom for navigation

const LecturerDashboard = () => {
  // State hook to store the issues and set them
  const [issues, setIssues] = useState([
    { id: 1, title: "Missing course unit marks", description: "Marks for MAT101 missing.", status: "Pending", student: "Mulungi Martha", comment: "" },
    { id: 2, title: "Technical issue with AITS platform", description: "System crash during exam upload.", status: "Resolved", student: "Mukisa John", comment: "" },
    { id: 3, title: "Conflicting exam schedule", description: "Two exams scheduled at the same time.", status: "On Hold", student: "Nakato Mary", comment: "" },
  ]);

  // State hook that stores the courses and set them
  const [courses, setCourses] = useState([
    { id: 101, name: "Computer Science 101", students: 120 },
    { id: 102, name: "Software Engineering", students: 95 },
  ]);

  // Function that handles changing the status of an issue
  const handleStatusChange = (id, newStatus) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === id ? { ...issue, status: newStatus } : issue  // Update the issue with the new status
      )
    );
  };

  // Function that handles changes in the comment field for an issue
  const handleCommentChange = (id, newComment) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === id ? { ...issue, comment: newComment } : issue  // Updates the issue with the new comment
      )
    );
  };

  // Function that handles edits in the issue title and description
  const handleIssueEdit = (id, newTitle, newDescription) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === id ? { ...issue, title: newTitle, description: newDescription } : issue  // Updates the issue with new title and description
      )
    );
  };

  // Function that adds a new course
  const handleCourseAdd = () => {
    const newCourse = { id: Date.now(), name: "New Course", students: 0 };  // Creates a new course with unique ID
    setCourses([...courses, newCourse]);  // Adds the new course to the courses array
  };

  // Function that removes a course
  const handleCourseRemove = (id) => {
    setCourses(courses.filter(course => course.id !== id));  // Removes the course with the given ID
  };

  // Function that edits a course name
  const handleCourseEdit = (id, newName, students) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...course, name: newName } : course  // Updates the course name
      )
    );
  };

  // Function to change the number of students in a course
  const handleStudentCountChange = (id, newCount) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...course, students: newCount } : course  // Updates the student count for the course
      )
    );
  };

  // Filter the issues that are either "On Hold" or "Pending"
  const escalatedIssues = issues.filter(issue => issue.status === "On Hold" || issue.status === "Pending");

  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Lecturer Dashboard</h1> {/* Heading for the page */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* Grid container for the sections */}

          {/* Manage Student Issues Section */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
            <h2 className="text-xl font-semibold mb-4">Manage Student Issues</h2> {/* Subheading for this section */}
            <table className="min-w-full table-auto"> {/* Table to display issues */}
              <thead className="bg-blue-600 text-white"> {/* Table header with styling */}
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Issue</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Student</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Comment</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue) => (  // Loops through each issue and display it in a table row
                  <tr key={issue.id}>
                    <td className="px-4 py-2">{issue.id}</td> {/* Display the issue ID */}
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="border px-2 py-1 rounded-md w-full"
                        value={issue.title}
                        onChange={(e) => handleIssueEdit(issue.id, e.target.value, issue.description)} // Updates title on change
                      />
                    </td>
                    <td className="px-4 py-2">
                      <textarea
                        className="border px-2 py-1 rounded-md w-full"
                        value={issue.description}
                        onChange={(e) => handleIssueEdit(issue.id, issue.title, e.target.value)} // Updates description on change
                      />
                    </td>
                    <td className="px-4 py-2">{issue.student}</td> {/* Display the student name */}
                    <td className="px-4 py-2">
                      <select
                        className="border px-2 py-1 rounded-md"
                        value={issue.status}
                        onChange={(e) => handleStatusChange(issue.id, e.target.value)} // Change status on selection
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
                        onChange={(e) => handleCommentChange(issue.id, e.target.value)} // Change comment on input
                        placeholder="Add comment"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Save</button> {/* Save button */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

             {/* Button to Lecturer Reports Page */}
         <div className="mt-4 text-left">
                    <Link to="/lecturer-reports">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        View and Edit Issues
                      </button>
                    </Link>
          </div>          

          {/* Escalated Issues Section */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
            <h2 className="text-xl font-semibold mb-4">Escalated Issues</h2>
            <table className="min-w-full table-auto">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Issue</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Student</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Comment</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {escalatedIssues.map((issue) => (  // Loop through escalated issues
                  <tr key={issue.id}>
                    <td className="px-4 py-2">{issue.id}</td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="border px-2 py-1 rounded-md w-full"
                        value={issue.title}
                        onChange={(e) => handleIssueEdit(issue.id, e.target.value, issue.description)}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <textarea
                        className="border px-2 py-1 rounded-md w-full"
                        value={issue.description}
                        onChange={(e) => handleIssueEdit(issue.id, issue.title, e.target.value)}
                      />
                    </td>
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
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Save</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Course Management Section */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
            <h2 className="text-xl font-semibold mb-4">Courses You Teach</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition mb-4"
              onClick={handleCourseAdd}
            >
              Add New Course
            </button>
            <table className="min-w-full table-auto">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-2">Course Name</th>
                  <th className="px-4 py-2">Number of Students</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (  // Loop through each course and display it
                  <tr key={course.id}>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="border px-2 py-1 rounded-md w-full"
                        value={course.name}
                        onChange={(e) => handleCourseEdit(course.id, e.target.value, course.students)}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        className="border px-2 py-1 rounded-md w-full"
                        value={course.students}
                        onChange={(e) => handleStudentCountChange(course.id, e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleCourseRemove(course.id)}  // Remove course button
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Links Section */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <div className="flex space-x-4">
              <Link to="/Settings" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Settings</Link>
              <Link to="/notifications" className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition">Notifications</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;  // Exporting the LecturerDashboard component
