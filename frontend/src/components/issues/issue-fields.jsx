"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { MultiSelect } from "@/components/muti-select"
import { Description } from "@radix-ui/react-dialog"
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";


export const TitleInput = React.memo(({dataRef, ...props}) => {
  const [title, setTitle] = React.useState(dataRef.current.title)
  const handleChange = (e) => {
    setTitle(e.target.value)
  }
  React.useEffect(() => {
    dataRef.current.title = title
  }, [title])

  return <>
    <Label htmlFor="title" className="font-semibold">Title</Label>
    <Input placeholder="Your title here..." name="title" id="title" value={title} onChange={handleChange} {...props}/>
  </>
})

export const DescriptionInput = React.memo(({dataRef}) => {
  const [description, setDescription] = React.useState(dataRef.current.description)
  const handleChange = (e) => {
    const value = e.target.value
    setDescription(prev => prev === null && value.length === 0 ? null : value)
  }
  React.useEffect(() => {
    dataRef.current.description = description
  }, [description])

  return <>
    <Label htmlFor="description" className="font-semibold">Description</Label>
    <Textarea placeholder="Add description here..." className="resize-none" name="description" id="description" value={description} onChange={handleChange} />
  </>
})

export const CreatorInput = React.memo(({creators, dataRef}) => {
  const [owner, setOwner] = React.useState(dataRef.current.owner)
  const handleChange = (value) => {
    setOwner(value)
  }
  React.useEffect(() => {
    dataRef.current.owner = owner
  }, [owner])

  return <>
    <Label htmlFor="owner" className="font-semibold">Creator</Label>
    <Select name="owner" value={String(owner)} onValueChange={handleChange}>
      <SelectTrigger id="owner" className="w-full">
        <SelectValue placeholder="Select a reviewer" />
      </SelectTrigger>
      <SelectContent>
        { creators?.length > 0
          && creators.map((c, i) => <SelectItem value={String(c.id)} key={i}>@{c.username}</SelectItem>)
          || <p>No Students</p>
        }
      </SelectContent>
    </Select>
  </>
})

export const AssigneeInput = React.memo(({assignees, item, dataRef}) => {
  const [assignee, setAssignee] = React.useState(dataRef.current.assignee)
  const handleChange = (value) => {
    setAssignee(value === "null" ? null : value)
  }
  React.useEffect(() => {
    dataRef.current.assignee = assignee
  }, [assignee])

  return <>
    <Label htmlFor="reviewer" className="font-semibold">Assignee</Label>
    <Select name="assignee" value={String(assignee === null ? "null" : assignee)} onValueChange={handleChange}>
      <SelectTrigger id="assignee" className="w-full">
        <SelectValue placeholder="Select a assignee" />
      </SelectTrigger>
      <SelectContent>
        {/* <SelectItem value="null">{"<"}{ Unassigned }{">"}</SelectItem> */}
        {item.status === "escalated" ? <SelectItem value={String(assignee === null ? "null" : assignee)}>{"<"}Registrar{">"}</SelectItem> : <SelectItem value="null">{"<"}Unassigned{">"}</SelectItem> }
        { assignees?.length > 0
            && assignees?.map((a, i) => <SelectItem value={String(a.id)} key={i}>@{a.username}</SelectItem>)
            || <p>No Lecturers</p>
        }
      </SelectContent>
    </Select>
  </>
})

export const StatusInput = React.memo(({statuses, dataRef}) => {
  const [status, setStatus] = React.useState(dataRef.current.status)
  const handleChange = (value) => {
    setStatus(value)
  }
  React.useEffect(() => {
    dataRef.current.status = status
  }, [status])

  return <>
    <Label htmlFor="status" className="font-semibold">Status</Label>
    <Select name="status" value={String(status)} onValueChange={handleChange}>
      <SelectTrigger id="status" className="w-full">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        { statuses?.map((s, i) => <SelectItem value={String(s.id)} key={i}>{s.name}</SelectItem>) }
      </SelectContent>
    </Select>
  </>
})

export const PriorityInput = React.memo(({priorities, dataRef}) => {
  const [priority, setPriority] = React.useState(dataRef.current.priority)
  const handleChange = (value) => {
    setPriority(value)
  }
  React.useEffect(() => {
    dataRef.current.priority = priority
  }, [priority])

  return <>
    <Label htmlFor="priority" className="font-semibold">Priority</Label>
    <Select name="priority" value={String(priority)} onValueChange={handleChange}>
      <SelectTrigger id="priority" className="w-full">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        { priorities?.map((p, i) => <SelectItem value={String(p.id)} key={i}>{p.name}</SelectItem>) }
      </SelectContent>
    </Select>
  </>

})

export const EscalationInput = React.memo(({escalationLevels, dataRef}) => {
  const [escalationLevel, setEscalationLevel] = React.useState(dataRef.current.escalation_level)
  const handleChange = (value) => {
    setEscalationLevel(value)
  }
  React.useEffect(() => {
    dataRef.current.escalation_level = escalationLevel
  }, [escalationLevel])

  return <>
    <Label htmlFor="escalation" className="font-semibold">Escalation Level</Label>
    <Select name="escalation_level" value={String(escalationLevel)} onValueChange={handleChange}>
      <SelectTrigger id="escalation" className="w-full">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        { escalationLevels?.map((l, i) => <SelectItem value={String(l.id)} key={i}>{l.name}</SelectItem>) }
      </SelectContent>
    </Select>
  </>
})

export const CategoriesInput = React.memo(({categories, dataRef}) => {
  const [cats, setCategories] = React.useState(dataRef.current.categories)
  const handleChange = (value) => {
    setCategories(prev => prev === null && value.length === 0 ? null : value)
  }
  React.useEffect(() => {
    dataRef.current.categories = cats
  }, [cats])

  return <>
    <Label htmlFor="type" className="font-semibold">Categories</Label>
    <MultiSelect
      options={categories.map(c => ({
        value: String(c.id),
        label: c.name,
        // icon: LoaderIcon,
      }))}
      onValueChange={handleChange}
      defaultValue={cats || []}
      placeholder="Select categories"
      variant="inverted"
      animation={2}
      maxCount={3}
    />
    <input hidden value={cats || []} name="categories" onChange={handleChange}/>
  </>
})

export const NotesInput = React.memo(({dataRef}) => {
  const [notes, setNotes] = React.useState(dataRef.current.notes)
  const handleChange = (e) => {
    const value = e.target.value
    setNotes(prev => prev === null && value.length === 0 ? null : value)
  }
  React.useEffect(() => {
    dataRef.current.notes = notes
  }, [notes])

  return <>
    <Label htmlFor="notes" className="font-semibold">Additional Notes</Label>
    <Textarea placeholder="Add notes here..." className="resize-none" name="notes" id="notes" value={notes === null ? "" : notes} onChange={handleChange} />
  </>
})

export function AttachmentsInput({dataRef, ...props}) {
  // const [files, setFiles] = React.useState<File[]>([]);
  const [files, setFiles] = React.useState(dataRef.current.attachments || []);
  const [showFileMeta, setShowFileMeta] = React.useState(false);

  React.useEffect(() => {
    dataRef.current.attachments = files
  }, [files])

  //   const onUpload = React.useCallback(
  //     async (
  //       files: File[],
  //       {
  //         onProgress,
  //         onSuccess,
  //         onError,
  //       }: {
  //         onProgress: (file: File, progress: number) => void;
  //         onSuccess: (file: File) => void;
  //         onError: (file: File, error: Error) => void;
  //       },
  //     ) => {
 
  return (
    <FileUpload
      value={files}
      onValueChange={setFiles}
      maxFiles={10}
      maxSize={5 * 1024 * 1024}
      className="w-full max-w-md"
      // onUpload={onUpload}
      // onFileReject={onFileReject}
      {...props}
      multiple
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <Upload className="size-6 text-muted-foreground" />
          </div>
          <p className="font-medium text-sm">Drag & drop files here</p>
          <p className="text-muted-foreground text-xs">
            Or click to browse (max 10 files, up to 5MB each)
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList orientation="horizontal">
        {files.map((file, index) => (
          <FileUploadItem key={index} value={file} className="p-0">
            <FileUploadItemPreview className="size-20 [&>svg]:size-12">
              <FileUploadItemProgress circular size={36} />
            </FileUploadItemPreview>
            <FileUploadItemMetadata
              className={cn(showFileMeta ? null : "sr-only")}
            />
            <FileUploadItemDelete asChild>
              <Button
                variant="secondary"
                size="icon"
                className="-top-1 -right-1 absolute size-5 rounded-full"
              >
                <X className="size-3" />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
      <div>
        <Checkbox
          id="filemeta"
          onCheckedChange={(e) => setShowFileMeta(prev => !prev)}
        />
        <label
          htmlFor="filemeta"
          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Show file details
        </label>
      </div>
    </FileUpload>
  );
}
