import React, { useState } from "react";  // Importing React and the useState hook for state management
import { Link } from "react-router-dom";  // Importing Link component from react-router-dom for navigation
// import * as React from "react"
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
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const LecturerDashboard = ({ stats, issues, users }) => {
  // State hook to store the mIssues and set them
  const [mIssues, setIssues] = useState([
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

  // Filter the mIssues that are either "On Hold" or "Pending"
  const escalatedIssues = mIssues.filter(issue => issue.status === "On Hold" || issue.status === "Pending");

  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Lecturer Dashboard</h1> {/* Heading for the page */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* Grid container for the sections */}

          {/* Manage Student Issues Section */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
            <h2 className="text-xl font-semibold mb-4">Manage Student Issues</h2> {/* Subheading for this section */}
            <table className="min-w-full table-auto"> {/* Table to display mIssues */}
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
                {mIssues.map((issue) => (  // Loops through each issue and display it in a table row
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
              <Link to="/dashboard/lecturer-reports">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        View reports and Edit Issues
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
                {escalatedIssues.map((issue) => (  // Loop through escalated mIssues
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
              <Link to="/dashboard/Settings" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Settings</Link>
              <Link to="/dashboard/notifications" className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition">Notifications</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// const data: Payment[] = [
  const data = [
    {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
]

// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

// export const columns: ColumnDef<Payment>[] = [
const columns  = [
    {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTableDemo() {
  // const [sorting, setSorting] = React.useState<SortingState>([])
  const [sorting, setSorting] = React.useState([])
  // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    const [columnFilters, setColumnFilters] = React.useState(
      []
  )
  const [columnVisibility, setColumnVisibility] =
  // React.useState<VisibilityState>({})
  React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          // value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          value={(table.getColumn("email")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}


const LecturerDashboardM = DataTableDemo

const LecturerDashboardX = () => {
  // State hook to store the mIssues and set them
  const [mIssues, setIssues] = useState([
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

  // Filter the mIssues that are either "On Hold" or "Pending"
  const escalatedIssues = mIssues.filter(issue => issue.status === "On Hold" || issue.status === "Pending");

  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Lecturer Dashboard</h1> {/* Heading for the page */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* Grid container for the sections */}

          {/* Manage Student Issues Section */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
            <h2 className="text-xl font-semibold mb-4">Manage Student Issues</h2> {/* Subheading for this section */}
            <table className="min-w-full table-auto"> {/* Table to display mIssues */}
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
                {mIssues.map((issue) => (  // Loops through each issue and display it in a table row
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
                    <Link to="/dashboard/lecturer-reports">
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
                {escalatedIssues.map((issue) => (  // Loop through escalated mIssues
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
                        className="text-red-700 hover:text-red-700 transition"
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
              <Link to="/dashboard/Settings" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Settings</Link>
              <Link to="/dashboard/notifications" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition">Notifications</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;  // Exporting the LecturerDashboard component
