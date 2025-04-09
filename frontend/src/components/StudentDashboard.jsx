import React from 'react';
import { Link } from 'react-router-dom';

const stats = [
  { title: 'Open Issues', value: 4 },
  { title: 'Resolved This Month', value: 6 },
  { title: 'Avg. Response Time', value: '2 days' },
];

const recentResponses = [
  {
    issue: 'Missing Exam Marks',
    author: 'Dr. Mugisha',
    preview: 'Please contact the exams office to confirm.',
    date: 'April 7, 2025',
  },
  {
    issue: 'Course Registration Error',
    author: 'Registrar',
    preview: 'The course was added manually. Try again.',
    date: 'April 6, 2025',
  },
];

const pinnedIssues = [
  { title: 'Change of Program', status: 'Pending' },
  { title: 'Appeal for Retake', status: 'In Progress' },
];

const enrolledCourses = [
  {
    code: 'CSC1201',
    name: 'Operating Systems',
    lecturer: 'Dr. Kaggwa',
    status: 'Ongoing',
  },
  {
    code: 'CSC1203',
    name: 'Systems Analysis and Design',
    lecturer: 'Ms. Namutebi',
    status: 'Ongoing',
  },
  {
    code: 'CSC1215',
    name: 'Computer Networks',
    lecturer: 'Mr. Lutaaya',
    status: 'Completed',
  },
];

const StudentDashboard = () => {
  return (
    <div className="space-y-6 px-4 py-6  bg-blue-200">
      <p className= "font-bold text-center text-3xl">Student Dashboard</p>

      {/* Quick Stats */}
      <h2 className="text-xl font-semibold mb-2">Issue Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white hover:bg-blue-100  shadow-md rounded-2xl p-4 text-center"
          >
            <div className="text-2xl font-semibold">{stat.value}</div>
            <div className="text-gray-600 text-sm">{stat.title}</div>
          </div>
        ))}
      </div>

       {/* Button to Student Reports Page */}
       <div className="mt-4 text-left ">
          <Link to="/student-reports">
            <button className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-blue-600">
              View reports and Add New Issues
            </button>
          </Link>
      </div>
      

      {/* My Courses */}
      <div>
        <h2 className="text-xl font-semibold mb-2">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enrolledCourses.map((course, index) => (
            <div key={index} className="bg-white hover:bg-blue-100 shadow-md rounded-2xl p-4">
              <div className="font-semibold text-lg">{course.name}</div>
              <div className="text-gray-500 text-sm">{course.code}</div>
              <div className="text-sm mt-1">
                <span className="text-gray-700">Lecturer: </span>{course.lecturer}
              </div>
              <div className="mt-2">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    course.status === 'Ongoing'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {course.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

       

      {/* Recent Responses */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Recent Responses</h2>
        <div className="bg-white hover:bg-blue-100 rounded-2xl shadow-md p-4 space-y-3">
          {recentResponses.map((item, idx) => (
            <div key={idx} className="border-b pb-2 last:border-b-0">
              <div className="font-medium">{item.issue}</div>
              <div className="text-sm text-gray-600">{item.author} – {item.date}</div>
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
            <div key={idx} className="flex justify-between items-center border-b pb-2 last:border-b-0">
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
    </div>
  );
};

export default StudentDashboard;

