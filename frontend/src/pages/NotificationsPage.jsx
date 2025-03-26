import { useState } from "react";

const Notifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      message: 'Your issue "Missing course unit marks" has been resolved.',
      date: "17/03/2025",
      type: "Issue Update",
    },
    {
      id: 2,
      message:
        'New comment added to your issue "Technical issue with AITS platform".',
      date: "16/03/2025",
      type: "Comment",
    },
    {
      id: 3,
      message: 'Your issue "Conflicting exam schedule " has been updated.',
      date: "15/03/2025",
      type: "Issue Upload",
    },
  ]);

  return (
    <div className="mx-auto p-6  bg-blue-100 ">
      
      
        <h1 className="text-2xl font-bold text-black-800">Notifications</h1>
    

      {/* Notifications Content */}
      <main className="flex-grow mx-auto p-6 w-full ">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-l-4 rounded-lg text-left ${
                notification.type === "Issue Update"  ? "bg-blue-200 border-blue-500" :
                notification.type === "Comment" ? "bg-yellow-100 border-yellow-500" :
                notification.type === "Issue Upload"  ? "bg-gray-200 border-green-500" : ""
              }`}
            >
              <p className="font-medium text-gray-700">{notification.type}</p>
              <p className="text-gray-800">{notification.message}</p>
              <p className="text-sm text-gray-500 mt-2">{notification.date}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
