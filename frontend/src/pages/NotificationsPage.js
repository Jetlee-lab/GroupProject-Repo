import  { useState } from 'react';

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
      id: 8,
      message:
        'New comment added to your issue "Technical issue with AITS platform".',
      date: "16/03/2025",
      type: "Comment",
    },
    {
      id: 6,
      message:
        'New comment added to your issue "Technical issue with AITS platform".',
      date: "16/03/2025",
      type: "Comment",
    },
    {
      id: 7,
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
    //Displaying the notifications components
    <div className=" mx-auto p-6 bg-blue-100">
      <h1 className="text-3xl font-semibold text-black-800 mb-6">
       
        Notifications
      </h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-l-4 rounded-lg ${
              //Conditional rendering of the notification type  based on the type of notification
              notification.type === "Issue Update" ? "bg-blue-200 border-blue-500":
              notification.type ===  "Comment" ? "bg-yellow-100 border-yellow-500":
              notification.type ==="Issue Upload" ? "bg-gray-200 border-green-500" : ""                
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
