import React from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@/hooks";
import { fetchIssues } from "@/lib/api";
import {
  STATUS_CLOSED,
  STATUS_OPEN,
  STATUS_ESCALATED,
  STATUS_RESOLVED,
  STATUS_INREVIEW,
  STATUS_REJECTED,
} from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";

const config = {
  [STATUS_RESOLVED]: {
    title: "Resolved",
    // cardClasses: "bg-green-40 border-green-200",
    // titleClasses: "text-green-400",
    countClasses: "text-green-400",
  },
  [STATUS_REJECTED]: {
    title: "Rejected",
    // cardClasses: "bg-red-40 border-red-200",
    // titleClasses: "text-red-400",
    countClasses: "text-red-400",
  },
  [STATUS_INREVIEW]: {
    title: "In Review",
    // cardClasses: "bg-blue-40 border-blue-200",
    // titleClasses: "text-blue-400",
    countClasses: "text-blue-400",
  },
  [STATUS_OPEN]: {
    title: "Open",
    // cardClasses: "bg-gray-40 border-gray-200",
    // titleClasses: "text-gray-400",
    countClasses: "text-gray-400",
  },
  [STATUS_CLOSED]: {
    title: "Closed",
    // cardClasses: "bg-gray-70 border-gray-300",
    // titleClasses: "text-gray-700",
    countClasses: "text-gray-700",
  },
  [STATUS_ESCALATED]: {
    title: "Escalated",
    // cardClasses: "bg-orange-40 border-orange-200",
    // titleClasses: "text-orange-400",
    countClasses: "text-orange-400",
  },
};

export default function IssueStats({ stats }) {
  // const totalIssues = stats.map((stats, i) => {

  // })

  // const pending = issues.filter((issue) => issue.status == STATUS_PENDING)
  // const resolved = issues.filter((issue) => issue.status == STATUS_RESOLVED)
  // const inreview = issues.filter((issue) => issue.status == STATUS_INREVIEW)
  // const open = issues.filter((issue) => issue.status == STATUS_OPEN)
  // const closed = issues.filter((issue) => issue.status == STATUS_CLOSED)
  // const escalated = issues.filter((issue) => issue.status == STATUS_ESCALATED)

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <IssueStatusStat statuses={stats.status || {}} />
    </div>
  );
}

function IssueStatusStat({ statuses }) {
  let issues = new Set();
  Object.entries(statuses).forEach(
    ([, s]) => (issues = new Set([...issues, ...s.issues]))
  );

  return (
    <>
      {Object.entries(config).map(([configStatus, configInfo], index) => {
        const status = statuses[configStatus];
        console.log({ configStatus, configInfo, status });
        // if (status === undefined)
        //   return

        return (
          <div
            key={index}
            className={cn(
              "text- p-4 rounded-lg shadow-md border border-gray-300",
              configInfo.cardClasses
            )}
          >
            <h2
              className={cn("text-lg font-semibold", configInfo.titleClasses)}
            >
              {configInfo.title}
            </h2>
            <p
              className={cn("text-2xl font-extrabold", configInfo.countClasses)}
            >
              {status?.issues.length || 0}
            </p>
          </div>
        );
      })}
      <div className="bg-black text-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Total Issues</h2>
        <p className="text-xl font-extrabold">{issues.size}</p>
      </div>
    </>
  );
}

IssueStats.Skeleton = function () {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {new Array(Object.entries(config).length + 1).fill().map((_, index) => {
        return (
          <div key={index} className="p-4 rounded-lg bg-gray-300">
            <div className="space-y-6">
              <Skeleton className="bg-gray-200 h-4 w-[100px] sm:w-full mr-8" />
              <Skeleton className=" bg-gray-200 h-4 w-[60px]" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
