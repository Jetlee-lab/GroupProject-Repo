import React from "react";
import { Link } from "react-router-dom";
import IssueStats from "./issues/IssueStats";
import CreateIssue from "@/components/issues/create-issue";
import IssueTable from "./issues/issue-table"; 
import { useUser } from "@/features/auth";
import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "@/lib/api";
import { formatDuration } from "date-fns";
import { queryClient } from "@/lib/client";
const CoursePrompt = React.lazy(() => import("./course-prompt"));

const stats = [
  { title: "Open Issues", value: 4 },
  { title: "Resolved This Month", value: 6 },
  { title: "Avg. Response Time", value: "2 days" },
];

const recentResponses = [
  {
    issue: "Missing Exam Marks",
    author: "Dr. Mugisha",
    preview: "Please contact the exams office to confirm.",
    date: "April 7, 2025",
  },
  {
    issue: "Course Registration Error",
    author: "Registrar",
    preview: "The course was added manually. Try again.",
    date: "April 6, 2025",
  },
];

const pinnedIssues = [
  { title: "Change of Program", status: "Pending" },
  { title: "Appeal for Retake", status: "In Progress" },
];

const enrolledCoursesX = [
  {
    code: "CSC1201",
    name: "Operating Systems",
    lecturer: "Dr. Kaggwa",
    status: "Ongoing",
  },
  {
    code: "CSC1203",
    name: "Systems Analysis and Design",
    lecturer: "Ms. Namutebi",
    status: "Ongoing",
  },
  {
    code: "CSC1215",
    name: "Computer Networks",
    lecturer: "Mr. Lutaaya",
    status: "Completed",
  },
];

const StudentDashboard = ({ stats, issues, users }) => {
  const { id } = useUser()
  const statsParams = { students: id, meta: ['name', 'code', 'duration'].join(',') }
  const {
    isPending: statsPending,
    error: statsError,
    data: statsRes,
    isFetching: statsFetching,
  } = useQuery({
    queryKey: ["stats", "courses", statsParams],
    queryFn: () => fetchStats({ stat: "courses", params: statsParams }),
  });

  const handleCourseEnrollment = React.useCallback((courses) => {
    console.log("Invalidating enrolled courses!")
    queryClient.invalidateQueries({
      queryKey: ["stats", "courses", statsParams],
      exact: true,
    })
  }, [id]);

  if (!statsRes) {
    return (
      <>
        {statsError ? (
          <div className="text-red-500 w-full h-full flex items-center justify-center">
            Error fetching data: {statsError.message}
          </div>
        ) : (
          <div className="text-gray-500">Loading...</div>
        )}
      </>
    )
  }
  
  const enrolledCourses = statsRes.data.students[id]?.courses
  console.log({statsRes, enrolledCourses})
  // return

  return (
    <div className="flex flex-col gap-14 space-y-6 px-4 py-4 rounded-lg">
      <div className="text-xl mb-2">
        <h1 className="font-bold text-3xl mb-6">Student Dashboard</h1>
        <IssueStats stats={stats} />
      </div>
      <div className="text-xl mb-2">
        <h4 className="font-bold w-full pb-4 text-center">Your Issues</h4>
        <IssueTable />
      </div>
      <div className="flex flex-row gap-8 mt-4 text-left ">
        <Link to="/dashboard/student-reports">
          <button className="bg-blue-500 text-white p-2 cursor-pointer rounded hover:bg-blue-600">
            View reports and Add New Issues
          </button>
        </Link>
        <CoursePrompt userId={id} isOpen={!enrolledCourses?.length} onCourseEnrolled={handleCourseEnrollment}/>
      </div>

      {/* My Courses */}
      <div>
        <h2 className="text-xl font-semibold mb-2">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enrolledCourses?.map(({name, code, duration}, index) => (
            <div
              key={index}
              className="bg-white hover:bg-blue-100 shadow-md rounded-2xl p-4"
            >
              <div className="font-semibold text-lg">{name}</div>
              <div className="text-gray-500 text-sm">{code}</div>
              {/* <div className="text-sm mt-1">
                <span className="text-gray-700">Lecturer: </span>
                {course.lecturer}
              </div> */}
              <div className="text-sm mt-1">
                <span className="text-gray-700">Duration: </span>
                {formatDuration({ weeks: duration })}
              </div>
              {/* <div className="mt-2">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    course.status === "Ongoing"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {course.status}
                </span>
              </div> */}
            </div>
          )) || <p>You are <b>not enrolled</b> to any courses yet!</p>}
        </div>
      </div>

      {/* Recent Responses */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Recent Responses</h2>
        <div className="bg-white hover:bg-blue-100 rounded-2xl shadow-md p-4 space-y-3">
          {recentResponses.map((item, idx) => (
            <div key={idx} className="border-b pb-2 last:border-b-0">
              <div className="font-medium">{item.issue}</div>
              <div className="text-sm text-gray-600">
                {item.author} – {item.date}
              </div>
              <div className="text-sm text-gray-500">{item.preview}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pinned Issues */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Pinned Issues</h2>
        <div className="bg-white hover:bg-blue-100 rounded-2xl shadow-md p-4 space-y-3">
          {pinnedIssues.map((issue, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border-b pb-2 last:border-b-0"
            >
              <div className="font-medium">{issue.title}</div>
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
            </div>
          ))}
        </div>
      </div>
      {/* <CoursePrompt userId={id} isOpen={!enrolledCourses?.length} onCourseEnrolled={handleCourseEnrollment}/> */}
    </div>
  );
};

export default StudentDashboard;
