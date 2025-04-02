import React from 'react'; 

export default function IssuesTable() {
  const issues = [
    { id: 1, student: 'Mulungi Martha', issue: 'Missing course work marks', status: 'Pending', date: '01/04/2025' },
    { id: 2, student: 'Nakato Mary', issue: 'Conflicting exam schedule', status: 'Resolved', date: '28/03/2025' },
    // Add more issues as required
  ];

  return (
    <div className="overflow-auto">
      <table className="min-w-full hover:bg-gray-100 table-auto">
        <thead className="bg-blue-700  text-white">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Student</th>
            <th className="px-4 py-2">Issue</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.id}>
              <td className="px-4 py-2">{issue.id}</td>
              <td className="px-4 py-2">{issue.student}</td>
              <td className="px-4 py-2">{issue.issue}</td>
              <td className="px-4 py-2">{issue.status}</td>
              <td className="px-4 py-2">{issue.date}</td>
              <td className="px-4 py-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
