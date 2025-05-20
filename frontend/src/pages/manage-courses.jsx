import React, { useState, useEffect, useCallback } from "react";
import { data, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useIssuesMeta, useActiveRole } from "@/hooks";
import { queryClient } from "@/lib/client";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import UnknownError from "@/pages/unknown-error";
import { LoaderIcon, BookLock, XIcon, Trash2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { fetchStats, paginate, createCourse, updateCourse, fetchDepartments, deleteCourse } from "@/lib/api";
import { ROLE_STUDENT } from "@/lib/constants";
import ReplyIssueForm from "@/components/issues/reply-issue";
import { useCopyToClipboard } from "usehooks-ts";

export default function ResolveIssue() {
  const statsParams = { units: '', meta: ['id', 'name', 'code', 'department', 'duration'].join(','), unitsMeta: ['id', 'name', "course"].join(',') }
  const {
    isPending: statsPending,
    error: statsError,
    data: statsRes,
    isFetching: statsFetching,
  } = useQuery({
    queryKey: ["stats", "courses", statsParams],
    queryFn: () => fetchStats({ stat: "courses", params: statsParams }),
  });
  const { isPending, error, data: departmentData, isFetching } = useQuery({
    queryKey: ["departments"],
    queryFn: () => fetchDepartments({ params: paginate(0, 1000) }),
  })
  const [isModalOpoen, setIsModalOpen] = useState(false)
  const [courseToEdit, setCourseToEdit] = useState({
    name: "",
    code: "",
    duration: "",
    units: [
      { name: "" }
    ],
  })
  // const [creatingNewCourse, setCreatingNewCourse] = useState(false)
 
  const handleSubmit = useCallback((e, c) => {
    e.preventDefault();
    const isUpdate = !!c.id;

    (isUpdate ? updateCourse : createCourse)(c)  //{...c, units: c.units.map(u => u.id)})
      .then((resp) => {
        toast(
          <span className="font-bold text-green-600">
            Course {isUpdate ? "Updated" : "Created"} successfully
          </span>
        );
        queryClient.invalidateQueries({
          queryKey: ["stats", "courses", statsParams],
          exact: true,
        })
      })
      .catch((e) => {
        console.error("createCourse", e);
      })
   }, []);

  const handleDismiss = useCallback((state) => setIsModalOpen(!!state))

  if (isPending || isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }

  // if (error) {
  //   if (error.response?.status === 404) {
  //     return <UnknownError />;
  //   }
  //   toast.error("Error fetching courses");
  //   console.error("Error fetching courses", error);
  // }

  const data = {};
  Object.values(statsRes?.data.units || {}).forEach(({courses, meta}) => {
    courses.forEach(({id, ...rest}) => {
      data[id] = data[id] || { "course": {id, ...rest}, "units": [] };
      if (meta.id !== null) // courses that don't have units
        data[id].units.push(meta)
    })
  });
  // console.log({ data, statsRes: statsRes?.data});

    return (
    <div className="flex flex-col gap-4 space-y-6 px-4 m-4 rounded-lg">
      <div className="w-full bg-white rounded-sm font-bold text-center p-4">
        <p>Courses</p>
        <div className="flex flex-row justify-between w-full">
          <Button variant="outline" className="mb-2 bg-blue-500 text-white p-4 cursor-pointer rounded hover:bg-blue-600"
           onClick={() => {
            setCourseToEdit({
              name: "",
              code: "",
              department: null,
              units: [{
                name: "",
              }],
            })
            setIsModalOpen(true)
          }}
          >
            Create new Course
          </Button>
        </div>
      </div>
      <Command>
        <CommandInput placeholder="Find course by name ..." />
        <CommandList className="max-h-[auto]">
          <CommandEmpty>No Courses Found.</CommandEmpty>
          <CommandGroup className="mt-4">
            <div className="grid grid-cols md:grid-cols-2 gap-x-2 gap-y-8">
              {Object.entries(data).map(([, { course, units }]) => (
                <CommandItem
                  key={course.id}
                  value={course.name}
                  onSelect={(value, ...args) => {
                    // handleCopy(token.token)
                    setCourseToEdit({...course, units})
                    setIsModalOpen(true)
                  }}
                  className="flex flex-col border"
                >
                  <div key={course.id} className="bg-white p-4 w-full h-full rounded-sm">
                    <p className="font-medium">{course.name}</p>
                    {units && <ul className="m-4 flex flex-col lg:mb-6">
                        {units.map(({name}, i) => (
                          <li key={i} className={`relative flex items-center gap-4 py-2 before:absolute before:left-[0.4rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A] ${ units.length === 1 ? "" : (i === 0 ? 'before:top-1/2 before:bottom-0' : (i === units.length - 1 ? 'before:top-0 before:bottom-1/2' : "before:top-0 before:bottom-0 "))}`}>
                            <span className="relative bg-white py-1 dark:bg-[#161615]">
                                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
                                </span>
                            </span>
                            <span>
                                {name}
                            </span>
                        </li>
                        ))}
                      </ul>
                    }
                  </div>
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
      <ManageCourseDialog isOpen={isModalOpoen} course={courseToEdit} departments={departmentData?.data} onSubmit={handleSubmit} onDismiss={handleDismiss}/>
    </div>
  );
}

function ManageCourseDialog({ isOpen, course, departments, onSubmit, onDismiss }) {
  const [response, setResponse] = useState({ fetching: false, content: null });
  const [mCourse, setMCourse] = useState(course)
  const isUpdate = !!course.id;
  const maxCodeLength = 5;
  const deleteMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: (data) => {
      toast(
        <span className="font-bold text-green-600">
          Course Deleted successfully
        </span>
      );
      queryClient.invalidateQueries({
        queryKey: ["stats", "courses"],
        // exact: true,
      });
    },
    onError: (error) => {
      toast.error("Error deleting course");
      console.error("Error deleting course", error);
    },
  });

  const onDepartmentChange = useCallback((value) => setMCourse(prev => ({ ...prev, "department": value })), [])

  useEffect(() => {
    setMCourse(course);
  }, [course]);

  function submit(e) {
    e.preventDefault();
    
    const c = {...mCourse}
    c.units = c.units.filter((unit) => !!unit.name)

    setResponse({ ...response, fetching: true });
    const submitResponse = onSubmit(e, c)
    setResponse((r) => {
      return { ...r, fetching: false };
    });
    onDismiss(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleUntsChange = (e) => {
    const { name, value } = e.target;
    const index = parseInt(name.split("-")[1]);
    setMCourse((prev) => {
      // const newUnits = [...prev.units];
      // newUnits[index] = { ...newUnits[index], name: value };
      // return {
      //   ...prev,
      //   units: newUnits,
      // };
      return {
        ...prev,
        units: prev.units.toSpliced(index, 1, {name: value}),
      };
    });
  }

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={ state => onDismiss(state) }>
      <DialogTrigger asChild>
        {/* <Link to="/account/password/change"> */}
          <Button variant="outline" className="hidden mb-2 bg-blue-500 text-white p-4 cursor-pointer rounded hover:bg-blue-600"
          //  onClick={setOpen(true)}
          >
            Create new Course
          </Button>
        {/* </Link> */}
      </DialogTrigger>
      <DialogContent className="m-4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold"></DialogTitle>
          <DialogDescription />
        </DialogHeader>
          <div className="grid gap-4">
            <div className="w-full max-w-sm md:max-w-xl">
              <Card className="overflow-hidden">
                <CardContent className="">
                  <form className="p-6 md:p-8" onSubmit={submit}>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col items-center text-center">
                        <h1 className="flex gap-4 text-2xl font-bold">
                          <BookLock size={28} strokeWidth={4} stroke="orange" />
                          { isUpdate ? "Update" : "Create" } Course
                        </h1>
                        <p className="mt-2 text-balance text-lg">
                          { isUpdate ? "Update course details" : "Create a new course" }
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 mt-4">
                        <Label htmlFor="name" className="font-bold">Course Name</Label>
                        <Input placeholder="Course name..." name="name" value={mCourse.name} onChange={handleChange} />
                      </div>
                      <div className="flex flex-row gap-4 mt-4">
                        <div className="flex-1">
                          <Label htmlFor="code" className="font-bold mb-2">Course Code</Label>
                          <Input placeholder="Course code..." max={maxCodeLength} name="code" value={mCourse.code} onChange={handleChange} />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor="department" className="font-bold mb-2">Course Department</Label>
                          <DepartmentInput defaultValue={String(mCourse.department)} departments={departments} onValueChange={onDepartmentChange}/>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-row justify-between gap-2">
                          <Label htmlFor="password" className="font-bold">Course Units</Label>
                          <Button className="text-sm text-white" type="button" onClick={() => setMCourse({...mCourse, units: [...mCourse.units, {}]})}>Add</Button>
                        </div>
                        <div className="flex flex-col gap-2 max-h-32 overflow-auto">
                        {mCourse.units.map((unit, i) => (
                          <div key={i} className="flex flex-row justify-between gap-2">
                            <Input placeholder="Course Unit..." name={`unit-${i}`} value={unit.name} onChange={handleUntsChange}/>
                            <XIcon className="" onClick={() => setMCourse({...mCourse, units: mCourse.units.toSpliced(i, 1)})} />
                          </div>
                        ))}
                        </div>
                      </div>
                      <div className="flex flex-row justify-between gap-2">
                        <Button
                          type="submit"
                          className="flex-1"
                          disabled={response.fetching || deleteMutation.isLoading}
                        >
                          {(response.fetching && (
                            <LoaderIcon className="animate-spin" />
                          )) ||
                            (isUpdate? "Update Course" : "Create Course")
                          }
                        </Button>
                        {isUpdate && <Button
                          type="button"
                          className="flex-1 bg-red-500 hover:bg-red-600"
                          disabled={deleteMutation.isLoading || response.fetching}
                          onClick={() => {
                            deleteMutation.mutate(mCourse.id);
                            setMCourse({ name: "", code: "", duration: "", units: [{ name: "" }] });
                            onDismiss(false);
                          }}
                        >
                          {(deleteMutation.isLoading && (
                            <LoaderIcon className="animate-spin" />
                          )) ||
                            <><Trash2Icon className=""/> {"Delete Course"}</>
                          }
                        </Button>
                        }
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const DepartmentInput = React.memo(({ departments, ...props }) => {
  return (
    <Select name="department" {...props}>
      <SelectTrigger id="departments" className="w-full">
        <SelectValue placeholder="Select Department" />
      </SelectTrigger>
      <SelectContent>
        { departments?.length > 0
          && departments.map((d, i) => <SelectItem value={String(d.id)} key={i}>{d.name}</SelectItem>)
          || <p>No Departments</p>
        }
      </SelectContent>
    </Select>
  )
});