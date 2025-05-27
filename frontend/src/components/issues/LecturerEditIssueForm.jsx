import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useIssuesMeta, useActiveRole } from "@/hooks";
import { queryClient } from "@/lib/client";
import { toast } from "sonner";
import {
  fetchUsers,
  fetchIssues,
  paginate,
  updateIssue,
  deleteIssue,
  fetchIssue,
} from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UnknownError from "@/pages/unknown-error";
import { LoaderIcon } from "lucide-react";
import {
  TitleInput,
  DescriptionInput,
  CreatorInput,
  AssigneeInput,
  PriorityInput,
  StatusInput,
  NotesInput,
  CategoriesInput,
  EscalationInput,
} from "@/components/issues/issue-fields";
import { ROLE_STUDENT } from "@/lib/constants";
import ReplyIssueForm from "@/components/issues/reply-issue"

export default function ResolveIssue() {
  const { issueId } = useParams();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["issues", issueId],
    queryFn: () => fetchIssue(issueId),
  });

  if (isPending || isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }
  if (error) {
    if (error.response?.status === 404) {
      return <UnknownError />;
    }
    toast.error("Error fetching issue");
    console.error("Error fetching issue", error);
  }

  return <ReplyIssueForm issue={data.data}/>
  // return <IssueResolveForm item={data.data} />;
}

function IssueResolveForm({ item }) {
  const studentsRes = queryClient.getQueryData(["users", "students"]);
  const lecturersRes = queryClient.getQueryData(["users", "lecturers"]);
  const issuesMeta = useIssuesMeta();
  const issueMutation = useMutation({
    mutationFn: updateIssue,
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ['issues'] })
      toast.success("Issue updated successfully");
      queryClient.invalidateQueries(["issues"]);
      // item = data.data
      console.log({ item, data: data.data });
    },
    onError: (error) => {
      toast.error("Error updating issue");
      console.error("Error updating issue", error);
    },
  });

  const [{ name: activeRole }] = useActiveRole();
  console.log({ issuesMeta });

  const dataRef = React.useRef({
    title: item.title,
    description: item.description,
    owner: item.owner.id,
    assignee: item.assignee?.id || null,
    status: issuesMeta.statuses.find((s) => s.name === item.status).id,
    priority: issuesMeta.priorities.find((p) => p.name === item.priority).id,
    escalation_level: issuesMeta.escalation_levels.find(
      (l) => l.name === item.escalation_level
    ).id,
    categories: item.categories.map((c) => String(c.id)),
    notes: item.notes,
  });
  const handleSubmit = (formData) => {
    // e.preventDefault()
    // e.stopPropagation()
    // const formData = new FormData(e.target)
    const data = dataRef.current;

    console.log({ data });
    issueMutation.mutate({ ...data, id: item.id });
  };

  return (
    <div className="flex flex-col gap-14 space-y-6 px-4 py-4 rounded-lg">
      <Card className="">
        <CardHeader>
          {/* <CardTitle>Create your Issue</CardTitle> */}
          {/* <CardDescription></CardDescription> */}
        </CardHeader>
        <CardContent>
          <form
            id="issue-update-form"
            className="flex flex-col gap-6"
            action={handleSubmit}
          >
            <div className="flex flex-col gap-3">
              <TitleInput dataRef={dataRef} />
            </div>
            <div className="flex flex-col gap-3">
              <DescriptionInput dataRef={dataRef} />
            </div>
            {(activeRole !== ROLE_STUDENT && (
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <CreatorInput
                    creators={studentsRes?.data}
                    dataRef={dataRef}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <AssigneeInput
                    assignees={lecturersRes?.data}
                    item={item}
                    dataRef={dataRef}
                  />
                </div>
              </div>
            )) ||
              null}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                {(activeRole === ROLE_STUDENT && (
                  <>
                    <Label htmlFor="status" className="font-semibold">
                      Status
                    </Label>
                    <StatusBadge status={item.status} className="p-2" />
                  </>
                )) || (
                  <StatusInput
                    statuses={issuesMeta.statuses}
                    dataRef={dataRef}
                  />
                )}
              </div>
              <div className="flex flex-col gap-3">
                {(activeRole === ROLE_STUDENT && (
                  <>
                    <Label htmlFor="status" className="font-semibold">
                      Priority
                    </Label>
                    <PriorityBadge priority={item.priority} className="p-2" />
                  </>
                )) || (
                  <PriorityInput
                    priorities={issuesMeta.priorities}
                    dataRef={dataRef}
                  />
                )}
              </div>
            </div>
            {(activeRole !== ROLE_STUDENT && (
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <EscalationInput
                    escalationLevels={issuesMeta.escalation_levels}
                    dataRef={dataRef}
                  />
                </div>
              </div>
            )) ||
              null}
            {/* <div className="grid grid-cols-2 gap-4"> */}
            <div className="flex flex-col gap-3">
              {/* <div className="p-4 max-w-xl"> */}
              <CategoriesInput
                categories={issuesMeta.categories}
                dataRef={dataRef}
              />
              {/* </div> */}
            </div>
            {/* </div> */}

            <div className="flex flex-col gap-3">
              <NotesInput notes={item.notes} dataRef={dataRef} />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-around">
          <Button form="issue-create-form" className="md:min-w-[160px]">
            {(issueMutation.isPending && (
              <LoaderIcon className="animate-spin" />
            )) ||
              "Submit"}
          </Button>
          {/* <FileUpload /> */}
        </CardFooter>
      </Card>
    </div>
  );
}
