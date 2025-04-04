import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import IssueStats from './issues/IssueStats';
import IssuesTable from './issues/IssueTable';
import ActivityFeed from './issues/ActivityFeed';
import { useQuery } from "@/hooks"
import { fetchIssues, fetchUsers } from '@/lib/api';

export default function RegistrarDashboard() {
  const { isLoading: issuesLoading, isFetching: issuesFetching, error: issuesError, data: issuesData } = useQuery(fetchIssues)
  const { isLoading: userssLoading, isFetching: usersFetching, error: usersError, data: usersData } = useQuery(fetchUsers)

  if (issuesFetching || usersFetching) {
    return <>Fetching issues...</>
  } else if (issuesLoading || userssLoading) {
    return <>Loading data...</>
  } else if (issuesError || usersError) {
    return <>Ops something happend!</>
  }

  const issues = issuesData.data
  const users = usersData.data

  return (
    <div className="p-4">
      <h2 className="text-2xl text-center font-bold mb-4">ACADEMIC REGISTRAR DASHBOARD</h2>

      {/* Overview section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <IssueStats issues={issues} />
      </div>

      {/* Issues Table */}
      <div className="mb-8">
        <h3 className="text-xl text-center font-semibold">ISSUE MANAGEMENT</h3>
        <IssuesTable issues={issues} users={users} />

        {/* Button to Registrar Reports Page */}
        <div className="mt-4 text-left">
          <Link to="/registrar-reports">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              View and Assign Issues
            </button>
          </Link>
        </div>
      </div>

      {/* Activity Feed */}
      <div>
        <h3 className="text-xl text-center font-semibold mb-4">RECENT ACTIVITY</h3>
        <ActivityFeed />
      </div>
    </div>
  );
}
