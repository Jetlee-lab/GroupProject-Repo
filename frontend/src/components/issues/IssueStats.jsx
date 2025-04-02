import React from 'react';

export default function IssueStats() {
  const stats = {
    pending: 5,
    resolved: 12,
    total: 17,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl">Pending Issues</h2>
        <p className="text-3xl">{stats.pending}</p>
      </div>
      <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl">Resolved Issues</h2>
        <p className="text-3xl">{stats.resolved}</p>
      </div>
      <div className="bg-gray-600 text-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl">Total Issues</h2>
        <p className="text-3xl">{stats.total}</p>
      </div>
    </div>
  );
}
