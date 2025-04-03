import React from "react";

const LandingPage = ({ user }) => {
  const recentActivities = [
    { id: 1, message: "Submitted an issue: 'Assignment 1 Deadline Issue'", time: "2 hours ago" },
    { id: 2, message: "Viewed the report: 'Exam Results Overview'", time: "1 day ago" },
    { id: 3, message: "Updated profile settings", time: "3 days ago" },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-6">
      {/* Welcome Section */}
      <div className="text-center mb-8 bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl border-t-4 border-blue-400">
        <h1 className="text-4xl font-bold text-blue-600">
          Welcome, {user?.name || "User"}!
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          We're glad to have you here. Stay on top of your academic tasks and deadlines.
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mb-8 border-t-4 border-blue-400">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Your Profile</h2>
        <div className="flex items-center space-x-4">
          <div className="bg-blue-200 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-gray-800 font-medium text-lg">{user?.name || "User"}</p>
            <p className="text-gray-500 text-sm">{user?.email || "user@example.com"}</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl border-t-4 border-blue-400">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Recent Activity</h2>
        <ul className="space-y-4">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="flex items-start space-x-4">
              <div className="bg-blue-200 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                {activity.id}
              </div>
              <div>
                <p className="text-gray-800 font-medium">{activity.message}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default LandingPage;
