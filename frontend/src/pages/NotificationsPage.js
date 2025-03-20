import React, { useState } from 'react';

const Notifications = () => {
  const [notifications] = useState([
    /* id:unique identifier for the notification, message: The text of the notification, date: The date the notification was created,type: The type of notification*/
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
      type: "Issue Update",
    },
    {
      id: 4,
      message: 'Your issue "Missing exam marks " has been updated.',
      date: "18/03/2025",
      type: "Issue Update",
    },
  ]);

  return (
    //Displaying the notifications components
    <div className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-semibold text-black-800 mb-6">
        {" "}
        Notifications
      </h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-l-4 rounded-lg ${
              notification.type === "Issue Update"
                ? "bg-blue-100 border-blue-500"
                : "bg-yellow-100 border-yellow-500"
            }`}
          >
            {/*Displaying the notification type */}
            <p className="font-medium text-gray-700">{notification.type}</p>
            {/*Displaying the notification message */}
            <p className="text-gray-800">{notification.message}</p>
            {/*Displaying the notification date */}
            <p className="text-sm text-gray-500 mt-2">{notification.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
