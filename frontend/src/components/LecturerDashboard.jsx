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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BookType } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import { fetchIssues, paginate } from "@/lib/api";
import CreateIssue from "@/components/issues/create-issue";
import IssueTable from "./issues/issue-table"; // Importing Link component from react-router-dom for navigation
import IssueStats from "./issues/IssueStats";
import { useUser } from "@/features/auth";
import { fetchStats } from "@/lib/api";

// import issueData from "./issues/data.json";

const LecturerDashboard = ({ stats, issues, users }) => {
  return (
    <div className="flex flex-col gap-14 space-y-6 px-4 py-4 rounded-lg">
      <TaughtCourses />
      <div className="text-xl mb-2">
        <h4 className="font-bold w-full pb-4 text-center">Assigned Issues</h4>
        <IssueTable />
        {/* <CreateIssue /> */}
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

function TaughtCourses(){
  const { id } = useUser()
  const statsParams = { staff: id, meta: ['name', 'course__students'].join(',') }
  // const {
  //   error: issuesMetaError,
  //   data: issuesMetaRes,
  //   isFetching: issuesMetaFetching,
  // } = useQuery({
  //   queryKey: ["issues", "meta"],
  //   queryFn: () => fetchIssuesMeta(),
  // });
  const {
    isPending: statsPending,
    error: statsError,
    data: statsRes,
    isFetching: statsFetching,
  } = useQuery({
    queryKey: ["stats", statsParams],
    queryFn: () => fetchStats({ stat: "course-units", params: statsParams }),
  });

  if (!statsRes) {
    return (
      <>
        {statsError ? (
          <div className="text-red-500">
            Error fetching data: {error.message}
          </div>
        ) : (
          <div className="text-gray-500">Loading...</div>
        )}
      </>
    )
  }
  const courseMap = {} // courseName: student[]
  statsRes.data.staff[id]?.course_units.forEach(({name, course__students}) => {
    let students = courseMap[name] = courseMap[name] || new Set()
    if (course__students === null)
      return
    students.add(course__students)
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Details</CardTitle>
        <CardDescription>
          An overview of your staff information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* <div className="flex space-x-2">
          <Input value="http://example.com/link/to/document" readOnly />
          <Button variant="secondary" className="shrink-0">
            Copy Link
          </Button>
        </div> */}
        <Separator className="my-4" />
        <div className="space-y-4">
          <div className="text-xl font-medium">Course units you teach</div>
          <div className="grid gap-6">
            {Object.keys(courseMap).length > 0 ? Object.entries(courseMap).map(([name, students], i) => (
            <div key={i} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4 w-full">
                {/* <Avatar>
                  <AvatarImage src="/avatars/03.png" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar> */}
                <BookType className="h-8 w-8 text-blue-300" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 w-full">
                  <p className="font-medium">
                    {name}
                  </p>
                  <p className="text-muted-foreground">
                    {students.size}{" "}student{students.size === 1 ? "" : "s"}
                  </p>
                </div>
              </div>
              <Select onValueChange={(value) => null}>
                <SelectTrigger className="ml-auto w-[110px]">
                  <SelectValue placeholder="Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">View Details</SelectItem>
                </SelectContent>
              </Select>
            </div>
            )) : <p classNmae="font-bold">No infomation to show!</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 

export default LecturerDashboard; // Exporting the LecturerDashboard component
