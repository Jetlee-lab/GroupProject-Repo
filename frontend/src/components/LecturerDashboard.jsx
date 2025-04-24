import React, { useState } from "react"; // Importing React and the useState hook for state management
import { Link } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  // ColumnDef,
  // ColumnFiltersState,
  // SortingState,
  // VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchIssues, paginate } from "@/lib/api";
import CreateIssue from "@/components/issues/create-issue";
import IssueTable from "./issues/issue-table"; // Importing Link component from react-router-dom for navigation
import IssueStats from "./issues/IssueStats";

// import issueData from "./issues/data.json";

const LecturerDashboard = ({ stats, issues, users }) => {
  return (
    <div className="flex flex-col gap-14 space-y-6 px-4 py-4 rounded-lg">
      <LecturerDashboardOld />
      <div className="text-xl mb-2">
        <h4 className="font-bold w-full pb-4 text-center">Assigned Issues</h4>
        <IssueTable />
        <CreateIssue />
      </div>
      <div className="mt-4 text-left ">
        <Link to="/dashboard/student-reports">
          <button className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-blue-600">
            View reports and Add New Issues
          </button>
        </Link>
      </div>
    </div>
    // </div>
  );
};

const LecturerDashboardOld = () => {
  // State hook to store the mIssues and set them
  const [mIssues, setIssues] = useState([
    {
      id: 1,
      title: "Missing course unit marks",
      description: "Marks for MAT101 missing.",
      status: "Pending",
      student: "Mulungi Martha",
      comment: "",
    },
    {
      id: 2,
      title: "Technical issue with AITS platform",
      description: "System crash during exam upload.",
      status: "Resolved",
      student: "Mukisa John",
      comment: "",
    },
    {
      id: 3,
      title: "Conflicting exam schedule",
      description: "Two exams scheduled at the same time.",
      status: "On Hold",
      student: "Nakato Mary",
      comment: "",
    },
  ]);

  // State hook that stores the courses and set them
  const [courses, setCourses] = useState([
    { id: 101, name: "Computer Science 101", students: 120 },
    { id: 102, name: "Software Engineering", students: 95 },
  ]);

  // Function that handles changing the status of an issue
  const handleStatusChange = (id, newStatus) => {
    setIssues((prevIssues) =>
      prevIssues.map(
        (issue) => (issue.id === id ? { ...issue, status: newStatus } : issue) // Update the issue with the new status
      )
    );
  };

  // Function that handles changes in the comment field for an issue
  const handleCommentChange = (id, newComment) => {
    setIssues((prevIssues) =>
      prevIssues.map(
        (issue) => (issue.id === id ? { ...issue, comment: newComment } : issue) // Updates the issue with the new comment
      )
    );
  };

  // Function that handles edits in the issue title and description
  const handleIssueEdit = (id, newTitle, newDescription) => {
    setIssues((prevIssues) =>
      prevIssues.map(
        (issue) =>
          issue.id === id
            ? { ...issue, title: newTitle, description: newDescription }
            : issue // Updates the issue with new title and description
      )
    );
  };

  // Function that adds a new course
  const handleCourseAdd = () => {
    const newCourse = { id: Date.now(), name: "New Course", students: 0 }; // Creates a new course with unique ID
    setCourses([...courses, newCourse]); // Adds the new course to the courses array
  };

  // Function that removes a course
  const handleCourseRemove = (id) => {
    setCourses(courses.filter((course) => course.id !== id)); // Removes the course with the given ID
  };

  // Function that edits a course name
  const handleCourseEdit = (id, newName, students) => {
    setCourses((prevCourses) =>
      prevCourses.map(
        (course) => (course.id === id ? { ...course, name: newName } : course) // Updates the course name
      )
    );
  };

  // Function to change the number of students in a course
  const handleStudentCountChange = (id, newCount) => {
    setCourses((prevCourses) =>
      prevCourses.map(
        (course) =>
          course.id === id ? { ...course, students: newCount } : course // Updates the student count for the course
      )
    );
  };

  return (
    <>
      {/* Quick Links Section */}
      <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="flex space-x-4">
          <Link
            to="/dashboard/Settings"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Settings
          </Link>
          <Link
            to="/dashboard/notifications"
            className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
          >
            Notifications
          </Link>
        </div>
      </div>
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
            {courses.map(
              (
                course // Loop through each course and display it
              ) => (
                <tr key={course.id}>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      className="border px-2 py-1 rounded-md w-full"
                      value={course.name}
                      onChange={(e) =>
                        handleCourseEdit(
                          course.id,
                          e.target.value,
                          course.students
                        )
                      }
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      className="border px-2 py-1 rounded-md w-full"
                      value={course.students}
                      onChange={(e) =>
                        handleStudentCountChange(course.id, e.target.value)
                      }
                    />
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleCourseRemove(course.id)} // Remove course button
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LecturerDashboard; // Exporting the LecturerDashboard component
