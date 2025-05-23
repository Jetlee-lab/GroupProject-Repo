import { BellRing, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useActiveRole } from "@/hooks/use-auth";
import { useUser } from "@/features/auth/hooks";
import {
  // fetchIssues,
  // fetchUsers,
  fetchStats,
  updateUser,
  // fetchIssuesMeta,
} from "@/lib/api";
import { queryClient } from "@/lib/client";
import { Switch } from "@/components/ui/switch";
import { ROLE_STUDENT } from "@/lib/constants";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

// type CardProps = React.ComponentProps<typeof Card>

// export function CardDemo({ className, ...props }: CardProps) {

export default function Timeline({ className, ...props }) {
  const user = useUser();
  const [{ name: activeRole }] = useActiveRole();
  const studentsRes = queryClient.getQueryData(["issues"]);
  const {
    error: issuesMetaError,
    data: issuesMetaRes,
    isFetching: issuesMetaFetching,
  } = useQuery({
    queryKey: ["issues", "meta", user.id],
    queryFn: () =>
      fetchStats({
        stat: "issues",
        params: {
          owner: user.id,
          Meta: [
            "title",
            "description",
            "updated_at",
            "created_at",
            "assignee",
          ].join(","),
        },
      }),
  });
  const userMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ['issues'] })
      toast.success("You will be notified of issues activity");
      // queryClient.invalidateQueries(["issues"])
      // Promise.all([
      //   queryClient.invalidateQueries({ queryKey: ['issues'] }),
      //   queryClient.invalidateQueries({ queryKey: ['stats'] })
      // ])
      // onSuccess ? onSuccess(data) : void(0);
      // document.dispatchEvent(event)
      // console.log({data})
    },
    onError: (error) => {
      toast.error("Failed to update settings");
      console.error("Failed to update settings", error);
    },
  });

  const old = [...(issuesMetaRes?.data.owner[user.id]?.issues || [])];

  const sortedIssues =
    issuesMetaRes?.data.owner[user.id]?.issues.sort((a, b) => {
      let dateA = new Date(a.updated_at);
      let dateB = new Date(b.updated_at);

      if (dateA === dateB) {
        dateA = new Date(a.created_at);
        dateB = new Date(b.created_at);
      }
      return dateB - dateA;
    }) || [];

  let summaryIssues, message;

  switch (activeRole) {
    case ROLE_STUDENT:
      summaryIssues = sortedIssues.filter((issue) => issue.assignee === null);
      message = `You have ${summaryIssues.length} unassigned issue${
        summaryIssues.length === 1 ? "" : "s"
      }`;
      break;
    default:
      summaryIssues = sortedIssues.filter(
        (issue) => issue.assignee === user.id
      );
      message = `You have ${summaryIssues.length} issue${
        summaryIssues.length === 1 ? "" : "s"
      } assigned to you`;
      break;
  }

  // console.log({
  //   activeRole,
  //   old,
  //   issuesMetaRes: issuesMetaRes?.data.owner[user.id].issues,
  //   sortedIssues,
  // });

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Enable Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              {user.notifications_enabled ? "You'll receive notifications to your email." : "Notifications have been disabled."}
            </p>
          </div>
          <Switch checked={user.notifications_enabled} onCheckedChange={state => userMutation.mutate({id: user.id, notifications_enabled: state})} />
        </div>
        <div>
          {sortedIssues.slice(0, 3).map((issue, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {issue.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {issue.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Show me these</Button>
      </CardFooter>
    </Card>
  );
}
