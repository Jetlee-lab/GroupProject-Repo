import React, { useState } from "react";  // Importing React and the useState hook for state management
import { Link } from "react-router-dom";  // Importing Link component from react-router-dom for navigation
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LecturerDashboard = () => {
  const [mIssues, setIssues] = useState([
    { id: 1, title: "Missing course unit marks", description: "Marks for MAT101 missing.", status: "Pending", student: "Mulungi Martha", comment: "" },
    { id: 2, title: "Technical issue with AITS platform", description: "System crash during exam upload.", status: "Resolved", student: "Mukisa John", comment: "" },
    { id: 3, title: "Conflicting exam schedule", description: "Two exams scheduled at the same time.", status: "On Hold", student: "Nakato Mary", comment: "" },
  ]);

  const [courses, setCourses] = useState([
    { id: 101, name: "Computer Science 101", students: 120 },
    { id: 102, name: "Software Engineering", students: 95 },
  ]);

  const [filter, setFilter] = useState("");

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

  const handleIssueEdit = (id, newTitle, newDescription) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === id ? { ...issue, title: newTitle, description: newDescription } : issue
      )
    );
  };

  const handleCourseAdd = () => {
    const newCourse = { id: Date.now(), name: "New Course", students: 0 };
    setCourses([...courses, newCourse]);
  };

  const handleCourseRemove = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleCourseEdit = (id, newName) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...course, name: newName } : course
      )
    );
  };

  const handleStudentCountChange = (id, newCount) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...course, students: newCount } : course
      )
    );
  };

  const filteredIssues = mIssues.filter(issue => 
    issue.title.toLowerCase().includes(filter.toLowerCase()) || 
    issue.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Lecturer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Manage Student Issues Section */}
        <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
          <h2 className="text-xl font-semibold mb-4">Manage Student Issues</h2>
          <Input
            placeholder="Search issues..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mb-4"
          />
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Actions</TableHead>
                <TableBody>
              {filteredIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell>{issue.id}</TableCell>
                  <TableCell>{issue.title}</TableCell>
                  <TableCell>{issue.description}</TableCell>
                  <TableCell>{issue.student}</TableCell>
                  <TableCell>
                    <select
                      value={issue.status}
                      onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Resolved">Resolved</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      value={issue.comment}
                      onChange={(e) => handleCommentChange(issue.id, e.target.value)}
                      placeholder="Add comment"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Manage Courses Section */}
        <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
          <h2 className="text-xl font-semibold mb-4">Manage Courses</h2>
          <Button onClick={handleCourseAdd} className="mb-4">Add Course</Button>
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Students Enrolled</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.id}</TableCell>
                  <TableCell>
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) => handleCourseEdit(course.id, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      value={course.students}
                      onChange={(e) => handleStudentCountChange(course.id, Number(e.target.value))}
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleCourseRemove(course.id)}>Remove</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;