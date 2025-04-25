import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useIssuesMeta, useActiveRole } from "@/hooks";
import { queryClient } from "@/lib/client";
import { toast } from "sonner";
import { fetchUsers, fetchTokens, paginate } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
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
import ReplyIssueForm from "@/components/issues/reply-issue";
import { useCopyToClipboard } from "usehooks-ts";

export default function ResolveIssue() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["reference-tokens"],
    queryFn: () => fetchTokens({params: paginate(0, 1000)}),
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

  return <GeneratedTonkens tokens={data.data} />;
  // return <IssueResolveForm item={data.data} />;
}

function GeneratedTonkens({ tokens }) {
  const studentsRes = queryClient.getQueryData(["users", "students"]);
  const lecturersRes = queryClient.getQueryData(["users", "lecturers"]);
  const issuesMeta = useIssuesMeta();
  // const issueMutation = useMutation({
  //   mutationFn: updateIssue,
  //   onSuccess: (data) => {
  //     // queryClient.invalidateQueries({ queryKey: ['issues'] })
  //     toast.success("Issue updated successfully");
  //     queryClient.invalidateQueries(["issues"]);
  //     // item = data.data
  //     console.log({ item, data: data.data });
  //   },
  //   onError: (error) => {
  //     toast.error("Error updating issue");
  //     console.error("Error updating issue", error);
  //   },
  // });

  const [{ name: activeRole }] = useActiveRole();
    const [copiedText, copy] = useCopyToClipboard();
  
  // console.log({ issuesMeta });
   const handleCopy = (text) => () => {
      copy(text)
        .then(() => {
          toast.info("Copied!");
        })
        .catch((error) => {
          toast.error("Failed to copy!");
        });
    };

  return (
    <div className="flex flex-col gap-14 space-y-6 px-4 m-4 rounded-lg">
      <Card className="">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Generated Tokens</CardTitle>
          {/* <CardDescription></CardDescription> */}
        </CardHeader>
        <CardContent>
          {(tokens.length > 0 && (
            <div>
              {/* <h1 className="mt-4 text-2xl font-bold tracking-tight text-center p-4 h-full text-balance text-gray-900">
                <p>Generated Tokens</p>
              </h1> */}
              <div className="flex flex-col space-y-6">
                {tokens.map((token) => (
                  <div key={token.id} className="flex flex-col space-y-6">
                    <h1 className="flex flex-row gap-8 mt-4 text-lg font-bold tracking-tight text-gray-900">
                      <p>{token.token}</p>
                      <Button
                        onClick={handleCopy(token.token)}
                      >
                        Copy
                      </Button>
                    </h1>
                    <div className="flex flex-col space-y-2">
                      <p className="font-semibold">
                        Email:{" "}
                        <span className="font-normal">
                          {/* {format(
                            new Date(token.created_at),
                            "MMM, do yyyy - H:m:s aa"
                          )} */}
                          {token.email}
                        </span>
                      </p>
                      <p className="font-semibold">
                        Used:&nbsp;&nbsp;&nbsp;
                        <span className="pl-4 font-normal">
                          {token.is_used ? "Yes" : "No"}
                        </span>
                      </p>
                      <p className="font-semibold">
                        Active:{" "}
                        <span
                          className={`pl-4 font-normal bg-${
                            token.active ? "red" : "blue"
                          }-200`}
                        >
                          {token.active ? "Yes" : "No"}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )) || (
            <div className="flex flex-col space-y-6 text-center">
              <h1 className="mt-4 text-2xl font-bold tracking-tight text-center p-4 h-full text-balance text-gray-900">
                <p>You haven't Generated tokens</p>
              </h1>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-around">
          {/* <Button form="issue-create-form" className="md:min-w-[160px]">
            {(fetchTokens.length > 0 && (
              <LoaderIcon className="animate-spin" />
            )) ||
              "Submit"}
          </Button> */}
          {/* <FileUpload /> */}
        </CardFooter>
      </Card>
    </div>
  );
}
