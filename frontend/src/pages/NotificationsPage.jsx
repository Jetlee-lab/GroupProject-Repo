import { useState, useEffect } from "react";
    
    const Notifications = () => {
      const [notifications, setNotifications] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const notificationsPerPage = 2; // Number of notifications per page
    
      useEffect(() => {
        // Simulate fetching notifications from an API
        const mockNotifications = [
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
            message: 'Your issue "Conflicting exam schedule" has been updated.',
            date: "15/03/2025",
            type: "Issue Upload",
          },
          {
            id: 4,
            message: 'Your issue "Library access issue" has been resolved.',
            date: "14/03/2025",
            type: "Issue Update",
          },
        ];
    
        setNotifications(mockNotifications);
      }, []);
    
      // Mark a notification as read
      const handleMarkAsRead = (id) => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== id)
        );
      };
    
      // Pagination logic
      const indexOfLastNotification = currentPage * notificationsPerPage;
      const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
      const currentNotifications = notifications.slice(
        indexOfFirstNotification,
        indexOfLastNotification
      );
    
      const totalPages = Math.ceil(notifications.length / notificationsPerPage);
    
      const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      };
    
      const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage((prevPage) => prevPage - 1);
        }
      };
    
      return (
        <div className="min-h-screen flex flex-col items-center bg-blue-100">
          <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Notifications
            </h1>
    
            {/* Notifications Content */}
            {currentNotifications.length > 0 ? (
              <main className="space-y-4">
                {currentNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-l-4 rounded-lg ${
                      notification.type === "Issue Update"
                        ? "bg-blue-200 border-blue-500"
                        : notification.type === "Comment"
                        ? "bg-yellow-100 border-yellow-500"
                        : notification.type === "Issue Upload"
                        ? "bg-gray-200 border-green-500"
                        : ""
                    }`}
                  >
                    <p className="font-medium text-gray-700">{notification.type}</p>
                    <p className="text-gray-800">{notification.message}</p>
                    <p className="text-sm text-gray-500 mt-2">{notification.date}</p>
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="mt-2 text-blue-500 hover:underline text-sm"
                    >
                      Mark as Read
                    </button>
                  </div>
                ))}
              </main>
            ) : (
              <p className="text-gray-500 text-center">No notifications available.</p>
            )}
    
            {/* Pagination Controls */}
            {notifications.length > notificationsPerPage && (
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Previous
                </button>
                <p className="text-gray-700">
                  Page {currentPage} of {totalPages}
                </p>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
    
          {/* Footer */}
          <footer className="mt-auto py-4 w-full text-center text-sm text-gray-500">
            Academic Issue Tracking System © 2025
          </footer>
        </div>
      );
    };
    
    export default Notifications;
  
