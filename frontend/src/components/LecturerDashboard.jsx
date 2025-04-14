import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const IssueRow = ({ issue, onEdit, onStatusChange, onCommentChange }) => (
  <TableRow key={issue.id}>
    <TableCell>{issue.id}</TableCell>
    <TableCell>
      <Input
        value={issue.title}
        onChange={(e) => onEdit(issue.id, e.target.value, issue.description)}
      />
    </TableCell>
    <TableCell>
      <Input
        value={issue.description}
        onChange={(e) => onEdit(issue.id, issue.title, e.target.value)}
      />
    </TableCell>
    <TableCell>{issue.student}</TableCell>
    <TableCell>
      <select
        value={issue.status}
        onChange={(e) => onStatusChange(issue.id, e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
        <option value="Rejected">Rejected</option>
      </select>
    </TableCell>
    <TableCell>
      <Input
        value={issue.comment || ""}
        onChange={(e) => onCommentChange(issue.id, e.target.value)}
        placeholder="Add comment"
      />
    </TableCell>
    <TableCell>
      <Button variant="primary">Save</Button>
    </TableCell>
  </TableRow>
);

const CourseRow = ({ course, onEdit, onRemove }) => (
  <TableRow key={course.id}>
    <TableCell>
      <Input
        value={course.name}
        onChange={(e) => onEdit(course.id, e.target.value, course.students)}
      />
    </TableCell>
    <TableCell>
      <Input
        type="number"
        value={course.students}
        onChange={(e) => onEdit(course.id, course.name, e.target.value)}
      />
    </TableCell>
    <TableCell>
      <Button variant="danger" onClick={() => onRemove(course.id)}>
        Remove
      </Button>
    </TableCell>
  </TableRow>
);

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

  const handleStatusChange = (id, newStatus) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === id ? { ...issue, status: newStatus } : issue
      )
    );
  };

  const handleCommentChange = (id, newComment)