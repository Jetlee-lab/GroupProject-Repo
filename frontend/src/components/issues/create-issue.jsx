import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import FileUpload from "@/components/file-upload";
import {
  TitleInput,
  DescriptionInput,
  CreatorInput,
  AssigneeInput,
  StatusInput,
  PriorityInput,
  EscalationInput,
  CategoriesInput,
  NotesInput,
  AttachmentsInput,
} from "./issue-fields";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoaderIcon } from "lucide-react"
import { useIssuesMeta } from "@/hooks/issues";
import { createIssue, fetchUsers, paginate } from "@/lib/api";
import { queryClient } from "@/lib/client";
import { useUser } from "@/features/auth/hooks";
import {
  STATUS_PENDING,
  STATUS_ESCALATED,
  ESCALATION_L0,
  PRIOTITY_MODERATE,
} from "@/lib/constants";

export default function CreateIssueForm() {
  const issuesMeta = useIssuesMeta();
  // const user = useAuth()
  const studentsRes = queryClient.getQueryData(["users", "students"]);
  const lecturersRes = queryClient.getQueryData(["users", "lecturers"]);
  const issueMutation = useMutation({
    mutationFn: createIssue,
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ['issues'] })
      toast.success("Issue Created successfully");
      // queryClient.invalidateQueries(["issues"])
    },
    onError: (error) => {
      toast.error("Error creating issue");
      console.error("Error creating issue", error);
    },
  });
  const onUpload = React.useCallback(
    async (files, { onProgress, onSuccess, onError }) => {
      // console.log({files})
      try {
        // Process each file individually
        const uploadPromises = files.map(async (file) => {
          try {
            // Simulate file upload with progress
            const totalChunks = 10;
            let uploadedChunks = 0;

            // Simulate chunk upload with delays
            for (let i = 0; i < totalChunks; i++) {
              // Simulate network delay (100-300ms per chunk)
              await new Promise((resolve) =>
                // setTimeout(resolve, Math.random() * 200 + 100)
                setTimeout(resolve, Math.random() * 0)
              );

              // Update progress for this specific file
              uploadedChunks++;
              const progress = (uploadedChunks / totalChunks) * 100;
              onProgress(file, progress);
            }

            // Simulate server processing delay
            // await new Promise((resolve) => setTimeout(resolve, 500));
            onSuccess(file);
          } catch (error) {
            onError(
              file,
              error instanceof Error ? error : new Error("Upload failed")
            );
          }
        });

        // Wait for all uploads to complete
        await Promise.all(uploadPromises);
      } catch (error) {
        // This handles any error that might occur outside the individual upload processes
        console.error("Unexpected error during upload:", error);
      }
    },
    []
  );

  //   const onFileReject = React.useCallback((file: File, message: string) => {
  const onFileReject = React.useCallback((file, message) => {
    toast(message, {
      description: `"${
        file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
      }" has been rejected`,
    });
  }, []);

  const user = useUser();

  const dataRef = React.useRef({
    title: "",
    description: "",
    owner: user.id,
    assignee: null,
    status: issuesMeta.statuses.find((s) => s.name === STATUS_PENDING).id,
    priority: issuesMeta.priorities.find((p) => p.name === PRIOTITY_MODERATE)
      .id,
    escalation_level: issuesMeta.escalation_levels.find(
      (l) => l.name === ESCALATION_L0
    ).id,
    categories: [],
    notes: null,
  });

  const item = [];

  const handleSubmit = (formData) => {
    // e.preventDefault()
    // e.stopPropagation()
    // const formData = new FormData(e.target)
    const data = dataRef.current;
    const nFormData = new FormData();

    for (let k in data) {
      if (k === "attachments") {
        data[k]?.forEach((file) => nFormData.append(k, file));
      } else if (k === "categories") {
        data[k]?.forEach((category) => nFormData.append(k, category));
      } else {
        if (data[k] === null) {
          continue;
        }
        nFormData.append(k, data[k]);
      }
    }

    console.log({
      data,
      dataRef,
      formData: [...formData.entries()],
      nFormData: [...nFormData.entries()],
    });
    issueMutation.mutate(nFormData);
  };

  return (
    <Card className="">
      <CardHeader>
        {/* <CardTitle>Create your Issue</CardTitle> */}
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent>
        <form
          id="issue-create-form"
          className="flex flex-col md:flex-row gap-8"
          action={handleSubmit}
        >
          <div className="flex flex-1 gap-6">
            <div className="w-full flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <TitleInput dataRef={dataRef} />
              </div>
              <div className="flex flex-col gap-3">
                <DescriptionInput dataRef={dataRef} />
              </div>
              <div className="flex flex-col gap-3">
                <CategoriesInput
                  categories={issuesMeta.categories}
                  dataRef={dataRef}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-1 gap-6">
            <div className="w-full flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <NotesInput notes={item.notes} dataRef={dataRef} />
              </div>
              {/* <FileUpload /> */}
              <AttachmentsInput
                dataRef={dataRef}
                onUpload={onUpload}
                onFileReject={onFileReject}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-around">
        <Button form="issue-create-form" className="md:min-w-[160px]">
          { issueMutation.isPending && <LoaderIcon className="animate-spin" /> || "Submit" }
        </Button>
        {/* <FileUpload /> */}
      </CardFooter>
    </Card>
  );
}
