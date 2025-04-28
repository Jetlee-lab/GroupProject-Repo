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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import UnknownError from "@/pages/unknown-error";
import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils"
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
import { Badge } from "@/components/ui/badge";
import { ROLE_STUDENT } from "@/lib/constants";
import ReplyIssueForm from "@/components/issues/reply-issue";
import { useCopyToClipboard } from "usehooks-ts";

export default function ResolveIssue() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["reference-tokens"],
    queryFn: () => fetchTokens({ params: paginate(0, 1000) }),
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
  const handleCopy = (text) => {
    copy(text)
      .then(() => {
        toast.info("Token copied to clipboard!");
      })
      .catch((error) => {
        toast.error("Failed to copy token!");
      });
  };

  return (
    <div className="flex flex-col gap-4 space-y-6 px-4 m-4 rounded-lg">
      <p className="w-full bg-white rounded-sm font-bold text-center py-4">
        Generated Tokens List
      </p>
      <Command>
        <CommandInput placeholder="Find token by email ..." />
        <CommandList className="max-h-[auto]">
          <CommandEmpty>No Tokens Found.</CommandEmpty>
          <CommandGroup className="mt-4">
            <div className="grid grid-cols md:grid-cols-2 gap-x-2 gap-y-8">
              {tokens.map((token) => {
                return (
                  <CommandItem
                    key={token.token}
                    value={token.email}
                    onSelect={(value, ...args) => {
                      handleCopy(token.token)
                    }}
                    className="flex flex-col border"
                  >
                    <div className="flex flex-row justify-between w-full">
                      <span className={cn("font-semibold", token.active && !token.is_used ? 'text-blue-500' : '')}>{token.token}</span>
                      {/* <Button onClick={handleCopy(token.token)}>Copy</Button> */}
                    </div>
                    <div className="mt-2 w-full flex flex-row justify-between">
                      <span>{token.email}</span>
                      <div className=""></div>
                      {(token.active && (
                        <Badge
                          variant="outlined"
                          className="border-2 text-blue-600"
                        >
                          Active
                        </Badge>
                      )) || (
                        <Badge
                          variant="outlined"
                          className="border-2 text-red-600"
                        >
                          Inactive
                        </Badge>
                      )}
                      {(token.is_used && (
                        <Badge
                          variant="outlined"
                          className="border-2 text-red-600"
                        >
                          Already used
                        </Badge>
                      )) || (
                        <Badge
                          variant="outlined"
                          className="border-2 text-blue-600"
                        >
                        Unused
                        </Badge>
                      )}
                    </div>
                  </CommandItem>
                );
              })}
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
