import React from 'react';

export default function ActivityFeed() {
  const activities = [
    { id: 1, action: 'Resolved issue #3 Mulungi Martha', time: '2025-04-01 09:45 AM' },
    { id: 2, action: 'New issue logged by Nakato Mary', time: '2025-03-30 03:30 PM' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold ">Recent Activity</h2>
      <ul>
        {activities.map(activity => (
          <li key={activity.id} className=" py-2">
            <p className="text-gray-700">{activity.action}</p>
            <p className="text-sm text-gray-500">{activity.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
