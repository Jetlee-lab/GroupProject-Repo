import React from 'react';
import { useQuery } from "@/hooks"
import { fetchIssues } from '@/lib/api';
import { STATUS_CLOSED, STATUS_OPEN, STATUS_ESCALATED, STATUS_RESOLVED, STATUS_REVIEW } from '@/lib/constants';


export default function IssueStats({issues}) {

  // const pending = issues.filter((issue) => issue.status == STATUS_PENDING)
  const resolved = issues.filter((issue) => issue.status == STATUS_RESOLVED)
  const inreview = issues.filter((issue) => issue.status == STATUS_REVIEW)
  const open = issues.filter((issue) => issue.status == STATUS_OPEN)
  const closed = issues.filter((issue) => issue.status == STATUS_CLOSED)
  const escalated = issues.filter((issue) => issue.status == STATUS_ESCALATED)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl">In review Issues</h2>
        <p className="text-3xl">{inreview.length}</p>
      </div>
      <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl">Resolved Issues</h2>
        <p className="text-3xl">{resolved.length}</p>
      </div>
      <div className="bg-gray-600 text-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl">Total Issues</h2>
        <p className="text-3xl">{issues.length}</p>
      </div>

    </div>
  );
}
