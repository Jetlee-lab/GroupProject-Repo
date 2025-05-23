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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { LoaderIcon, BookLock, XIcon, Trash2Icon, PlusIcon, ChevronDown } from "lucide-react";
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
import { fetchStats, paginate, createFaculty, updateFaculty, createCourse, updateCourse, assignCourse, fetchFaculties, fetchDepartments, deleteCourse, fetchUsers } from "@/lib/api";
import { ROLE_STUDENT } from "@/lib/constants";
import ReplyIssueForm from "@/components/issues/reply-issue";
import { useCopyToClipboard } from "usehooks-ts";

export default function ResolveIssue() {
  // const statsParams = { units: '', meta: ['id', 'name', 'code', 'department', 'duration'].join(','), unitsMeta: ['id', 'name', "code", "course"].join(',') }
  const statsParams = {
    meta: ['id', 'name', 'code', 'duration', 'units__id', "units__name", "units__code"].join(','),
    department: '',
    departmentMeta: ['id', 'name', "faculty__id", "faculty__name"].join(',')
  }
  const {
    isPending: statsPending,
    error: statsError,
    data: statsRes,
    isFetching: statsFetching,
  } = useQuery({
    queryKey: ["stats", "courses", statsParams],
    queryFn: () => fetchStats({ stat: "courses", params: statsParams }),
  });
  const { isPending: isFacultyPending, error: facultyError, data: facultyData, isFetching: isFacultyFetching } = useQuery({
    queryKey: ["faculties"],
    queryFn: () => fetchFaculties({ params: paginate(0, 1000) }),
  })
  const { isPending, error, data: departmentData, isFetching } = useQuery({
    queryKey: ["departments"],
    queryFn: () => fetchDepartments({ params: paginate(0, 1000) }),
  })
  const { isPending: isLecturerPending, error: lecturerError, data: lecturersData, isFetching: isLecturerFetching } = useQuery({
    queryKey: ["lecturers"],
    queryFn: () => fetchUsers({ endpoint: "lecturers", params: paginate(0, 1000) }),
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [courseToEdit, setCourseToEdit] = useState({
    name: "",
    code: "",
    duration: null,
    department: null,
    units: [
      { name: "", code: "" }
    ],
  })
  // const [creatingNewCourse, setCreatingNewCourse] = useState(false)
 
  const handleSubmit = useCallback(async (e, c) => {
    e.preventDefault();
    // console.log({c})
    // return
    const isUpdate = !!c.id;
    let isSuccess = true;

    await ((isUpdate ? updateCourse : createCourse)(c)  //{...c, units: c.units.map(u => u.id)})
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
        isSuccess = false;
        console.error("createCourse", e);
      }));
      return isSuccess
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

  const data = [];
  const dataMap = {}
  // Object.values(statsRes?.data.units || {}).forEach(({courses, meta}) => {
  //   courses.forEach(({id, ...rest}) => {
  //     data[id] = data[id] || { "course": {id, ...rest}, "units": [] };
  //     if (meta.id !== null) // courses that don't have units
  //       data[id].units.push(meta)
  //   })
  // });
  
  Object.values(statsRes?.data.department || {}).forEach(({courses, meta: { id, ...dRest } }) => {
    const department = { id }
    let faculty = data.find(f => f.id === dRest.faculty__id)
    if (! faculty) {
      faculty = {}
      data.push(faculty)
    }

    for (let k in dRest) {
      const [k1, k2] = k.split('__')
        if (k2) {
          faculty[k2] = dRest[k]
        } else {
          department[k] = dRest[k]
        }
      }

    const _courses = { }
    courses.forEach(({ id, ...cRest }) => {
      const unit = {}
      for (let k in cRest) {
        const [k1, k2] = k.split('__')
        if (k2) {
          unit[k2] = cRest[k]
        } else {
          _courses[id] = _courses[id] || { id, department: department.id }
          _courses[id][k] = cRest[k]
        }
      }
      _courses[id].units = [...(_courses[id].units || []), unit]
    })

    department.courses = Object.values(_courses)
    faculty.departments = [...(faculty.departments || []), department]
    // dataMap.faculties.push(faculty)
    // dataMap.departments.push(department)
  });
  const courses = data.reduce((acc, { departments }) => (
    [...acc, ...departments.reduce((acc2, { courses }) => [...acc2, ...courses], [])]
  ), []);

  return (
    <div className="flex flex-col gap-4 space-y-6 px-4 m-4 rounded-lg">
      <div className="w-full bg-white rounded-sm font-bold text-center p-4">
        <p className="text-xl mb-8">Courses Management</p>
        <div className="flex flex-row w-full items-center justify-center gap-4">
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
            setIsModalOpen("course")
          }}
          >
            Create new Course
          </Button>
          <Button variant="outline" className="mb-2 bg-blue-500 text-white p-4 cursor-pointer rounded hover:bg-blue-600"
           onClick={() => {setIsModalOpen("lecturer")}}
          >
            Assign Courses to Lecturers
          </Button>
          <Button variant="outline" className="mb-2 bg-blue-500 text-white p-4 cursor-pointer rounded hover:bg-blue-600"
           onClick={() => {setIsModalOpen("faculty")}}
          >
            Manage Departments and Faculties
          </Button>
        </div>
      </div>
      <Command>
        <CommandInput placeholder="Find course by name ..." />
        <CommandList className="max-h-[auto]">
          <CommandEmpty>No Courses Found.</CommandEmpty>
          <CommandGroup className="mt-4">
            <div className="grid grid-cols md:grid-cols-2 gap-x-2 gap-y-8">
              {/* {Object.entries(data).map(([, { course, units }]) => ( */}
              {courses.map(({units, ...course}) => (
                <CommandItem
                  key={course.id}
                  value={course.name}
                  onSelect={(value, ...args) => {
                    // handleCopy(token.token)
                    setCourseToEdit({...course, units})
                    setIsModalOpen("course")
                  }}
                  className="flex flex-col border"
                >
                  <div key={course.id} className="bg-white p-4 w-full h-full rounded-sm">
                    <p className="font-medium">{course.name}</p>
                    {units && <ul className="m-4 flex flex-col lg:mb-6">
                        {units.map(({name, code}, i) => (
                          <li key={i} className={`relative flex items-center gap-4 py-2 before:absolute before:left-[0.4rem] before:border-l before:border-blue-300 dark:before:border-[#3E3E3A] ${ units.length === 1 ? "" : (i === 0 ? 'before:top-1/2 before:bottom-0' : (i === units.length - 1 ? 'before:top-0 before:bottom-1/2' : "before:top-0 before:bottom-0 "))}`}>
                            <span className="relative bg-white py-1 dark:bg-[#161615]">
                                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-blue-300 bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 dark:bg-[#3E3E3A]" />
                                </span>
                            </span>
                            <span>
                                {`${name} - (${code})`}
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
      <ManageFacultyDialog isOpen={isModalOpen === "faculty"} faculties={facultyData?.data} departments={departmentData?.data} onSubmit={handleSubmit} onDismiss={handleDismiss}/>
      <ManageCourseDialog isOpen={isModalOpen === "course"} course={courseToEdit} departments={departmentData?.data} onSubmit={handleSubmit} onDismiss={handleDismiss}/>
      <LecturerManageDialog isOpen={isModalOpen === "lecturer"} courses={courses} lecturers={lecturersData?.data} onSubmit={() => setIsModalOpen(false)} onDismiss={handleDismiss}/>
    </div>
  );
}

function ManageCourseDialog({ isOpen, course, departments, onSubmit, onDismiss }) {
  const [response, setResponse] = useState({ fetching: false, content: null });
  const [mCourse, setMCourse] = useState(course)
  const isUpdate = !!course.id;
  const maxCodeLength = 5;
  const [isFormClean, setIsFormClean] = useState(false);
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
    const isSuccess = onSubmit(e, c)
    setResponse((r) => {
      return { ...r, fetching: false };
    });
    if (isSuccess || isSuccess === undefined ) {
      setTimeout(() => onDismiss(false), 100);
    }
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
    const [, index, vname] = name.split("-");
    setMCourse((prev) => {
      // const newUnits = [...prev.units];
      // newUnits[index] = { ...newUnits[index], [vname]: value };
      // return {
      //   ...prev,
      //   units: newUnits,
      // };
      return {
        ...prev,
        units: prev.units.toSpliced(index, 1, {...(prev.units[index] || {}), [vname]: value}),
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
      <DialogContent className="overflow-auto max-h-[vh] md:min-w-xl">
        <DialogHeader className="hidden">
          <DialogTitle className="font-bold"></DialogTitle>
          <DialogDescription />
        </DialogHeader>
          <div className="grid gap-4">
            <div className="w-full">
              <Card className="overflow-hidden">
                <CardContent className="">
                  <form className="" onSubmit={submit}>
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
                        <Label htmlFor="name" className="font-bold">Programme Name</Label>
                        <Input placeholder="Programme name ..." required name="name" value={mCourse.name} onChange={handleChange} />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <div className="flex-1">
                          <Label htmlFor="code" className="font-bold mb-2">Programme Code</Label>
                          <Input placeholder="Programme code ..." required max={maxCodeLength} name="code" value={mCourse.code} onChange={handleChange} />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor="department" className="font-bold mb-2">Programme Department</Label>
                          <DepartmentInput defaultValue={mCourse.department ? String(mCourse.department) : undefined} required departments={departments} onValueChange={onDepartmentChange}/>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-row justify-between gap-2">
                          <Label htmlFor="new-courseunit" className="font-bold">Course Units</Label>
                          <Button className="text-sm text-white" type="button" onClick={() => setMCourse({...mCourse, units: [...mCourse.units, {name: "", code: ""}]})}><PlusIcon /> Add</Button>
                        </div>
                        <div className="flex flex-col gap-2 max-h-32 overflow-auto">
                        {mCourse.units.map((unit, i) => (
                          <div key={i} className="flex flex-row justify-between gap-2">
                            <div className="flex flex- gap-2">
                              <Input placeholder="Course Unit Name ..." required name={`unit-${i}-name`} value={unit.name} onChange={handleUntsChange}/>
                              <Input placeholder="Code ..." required name={`unit-${i}-code`} value={unit.code} onChange={handleUntsChange}/>
                              </div>
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

function LecturerManageDialog({ isOpen, lecturers, courses, onSubmit, onDismiss }) {
  const [postData, setPostData] = useState({
    lecturerId: null,
    units: [],
  })
  const assignCourseMutation = useMutation({
    mutationFn: assignCourse,
    onSuccess: (data) => {
      toast(
        <span className="font-bold text-green-600">
          Courses dssigned successfully
        </span>
      );
      queryClient.invalidateQueries({
        queryKey: ["lecturers"],
      });
      onSubmit(postData)
    },
    onError: (error) => {
      toast.error("Error assigning courses");
      console.error("Error assigning course", error);
    },
  });
  
  function submit(e) {
    e.preventDefault();

    if (!postData.lecturerId || !postData.units.length) {
      toast(
        <span className="w-full text-center font-bold text-red-600">
          Please Fill all form fields
        </span>
      );
      return
    }
    assignCourseMutation.mutate(postData) //{id: postData.lecturerId, units: postData.units.map(u => u.id)})
    setPostData({
      lecturerId: null,
      units: []
    })
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
      <DialogContent className="overflow-auto max-h-[vh] md:min-w-xl">
        <DialogHeader className="hidden">
          <DialogTitle className="font-bold"></DialogTitle>
          <DialogDescription />
        </DialogHeader>
          <div className="grid gap-4">
            <div className="w-full">
              <Card className="overflow-hidden">
                <CardContent className="">
                  <form className="" onSubmit={submit}>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col items-center text-center">
                        <h1 className="flex gap-4 text-2xl font-bold">
                          <BookLock size={28} strokeWidth={4} stroke="orange" />
                          Lecturer Course Management
                        </h1>
                        <p className="mt-2 text-balance text-lg">
                          Assign courses to lecturers
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 mt-4">
                        <Label htmlFor="lecturer" className="font-bold">Lecturer</Label>
                          <LecturerInput required lecturers={lecturers} onValueChange={(value) => setPostData({
                            ...postData,
                            lecturerId: value,
                            units: lecturers.find(({id}) => id == value).course_units
                          })}/>
                      </div>
                      <div className="flex flex-col gap-4">
                        <CourseAddInput lecturerUnits={postData.lecturerId ? postData.units : []} courses={courses} onValueChange={(units) => setPostData({ ...postData, units })} />
                      </div>
                      <div className="flex flex-row justify-between gap-2">
                        <Button
                          type="submit"
                          className="flex-1"
                          disabled={assignCourseMutation.isLoading}
                        >
                          {(assignCourseMutation.isLoading && (
                            <LoaderIcon className="animate-spin" />
                          )) ||
                            "Assign Course Units"
                          }
                        </Button>
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

function ManageFacultyDialog({ isOpen, faculties, departments, onSubmit, onDismiss }) {
  // const isUpdate = !!course.id;
  // const [selectedFaculty, setSelectedFaculty] = useState(null)
  const [isNew, setIsNew] = useState(false)
  const [postData, setPostData] = useState({
    id: "",
    name: "",
    departments: [],
  })
  const createFacultyMutation = useMutation({
    mutationFn: async func => func(),
    onSuccess: (data) => {
      toast(
        <span className="font-bold text-green-600">
          Faculty created successfully
        </span>
      );
      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });
      queryClient.invalidateQueries({
        queryKey: ["faculties"],
      });
      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });

      setPostData({
        id: "",
        name: "",
        departments: []
      })
      setTimeout(() => onDismiss(false), 100);
    },
    onError: (error) => {
      toast.error("Error creating faculty");
      console.error("Error creating faculty", error);
    },
  });

  function submit(e) {
    e.preventDefault();
    console.log(postData)
    
    if (!postData.name || postData.departments.find(d => !d.name.length)) {
      toast(
        <span className="w-full text-center font-bold text-red-600">
          Please Fill all form fields
        </span>
      );
      return
    }
    // console.log(postData)
    createFacultyMutation.mutate(() => (isNew ? createFaculty : updateFaculty)({
      ...postData,
      departments: [...postData.departments.map(({id, ...r}) => id === "" ? r : {id, ...r})]
    }))
  }

  const onDepartmentChange = useCallback((e, id) => {
    const { name, value } = e.target;
    const [, index, vname] = name.split("-");
    setPostData((prev) => {
      return {
        ...prev,
        departments: prev.departments.toSpliced(index, 1, {...(prev.departments[index] || {}), [vname]: value}),
      };
    });
  })

  if (!isOpen) return null;

  // console.log({...postData.departments})

  return (
    <Dialog open={isOpen} onOpenChange={ state => onDismiss(state) }>
      <DialogTrigger asChild>
        {/* <Link to="/account/password/change"> */}
          <Button variant="outline" className="hidden mb-2 bg-blue-500 text-white p-4 cursor-pointer rounded hover:bg-blue-600"
          //  onClick={setOpen(true)}
          >
            Manage Faculties and Departments
          </Button>
        {/* </Link> */}
      </DialogTrigger>
      <DialogContent className="overflow-auto max-h-[vh] md:min-w-xl">
        <DialogHeader className="hidden">
          <DialogTitle className="font-bold"></DialogTitle>
          <DialogDescription />
        </DialogHeader>
          <div className="grid gap-4">
            <div className="w-full">
              <Card className="overflow-hidden">
                <CardContent className="">
                  <form className="" onSubmit={submit}>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col items-center text-center">
                        <h1 className="flex gap-4 text-2xl font-bold">
                          <BookLock size={28} strokeWidth={4} stroke="orange" />
                          Faculties & Departments
                        </h1>
                        <p className="mt-2 text-balance text-lg">
                          Manage Faculties and departments
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 mt-4">
                        <Label htmlFor="faculties" className="font-bold">{isNew ? "Faculty Name" : "Select Faculty"}</Label>
                        <div className="flex flex-row justify-between gap-4">
                          <div className="w-full">
                            { isNew ? (
                              <Input placeholder="Enter Faculty Name..." required name={`faculty`} value={postData.name} onChange={e => setPostData({...postData, name: e.target.value})}/>
                            ) : <FacultyInput defaultValue={postData.id} required faculties={faculties} onValueChange={(value) => {
                              const { id, name } = faculties.find(f => f.id == value)
                              setPostData({
                                id,
                                name,
                                departments: departments.filter(d => d.faculty == value)
                              })}
                             }/>}
                          </div>
                          <Button className="text-sm text-white" type="button" onClick={() => {
                            setPostData({id: "", name: "", departments: [{id: "", name: ""}]})
                            setIsNew(prev => !prev)
                          }}>{ isNew ? "Select Instead" : <><PlusIcon />New Faculty</>}</Button>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <div className="flex flex-col gap-8 self-center items-center">
                          <Label htmlFor="departments" className="font-bold flex-1">Departments</Label>
                          <Button className="text-sm text-white" type="button" onClick={() => setPostData({...postData, departments: [...postData.departments, {id: "", name: ""}]})}><PlusIcon />Add Department</Button>
                        </div>
                        <div className="flex flex-col gap-2 self-center w-full max-h-56 overflow-auto">
                        {postData.departments.map((department, i) => (
                          <div key={i} className="flex flex-row justify-between gap-2">
                            <div className="flex gap-2 w-full">
                              <Input placeholder="Department Name..." required name={`department-${i}-name`} value={department.name} onChange={(e) => onDepartmentChange(e, department.id)}/>
                              </div>
                            { !department.id && <XIcon className="" onClick={() => setPostData({...postData, departments: postData.departments.toSpliced(i, 1)})} />}
                          </div>
                        ))}
                        </div>
                      </div>
                      <div className="flex flex-row justify-between gap-2">
                        <Button
                          type="submit"
                          className="flex-1"
                          disabled={createFacultyMutation.isLoading}
                        >
                          {(createFacultyMutation.isLoading && (
                            <LoaderIcon className="animate-spin" />
                          )) ||
                            "Submit"
                          }
                        </Button>
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

export function CourseAddInput({ lecturerUnits, courses, onValueChange }) {
  const [open, setOpen] = React.useState(false);
  const [selectedUnits, setSelectedUnits] = useState(lecturerUnits || [])

  useEffect(() => {
    setSelectedUnits(lecturerUnits)
  }, [lecturerUnits])
  
  return (
    <div className="flex flex-col items-center gap-8 space-x-4 mr-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className=" justify-center "
          >
            <PlusIcon /> Add Course{"(s)"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="left" align="start">
          <Command className="max-h-[vh]">
            <CommandInput placeholder="Search for course unit..." />
            <CommandList>
              <CommandEmpty>No Course Units Found.</CommandEmpty>
                {courses.map(({units, ...course}) => (
                  <CommandGroup key={course.id}>
                    <span className="text-muted-foreground">{course.name}</span>
                    {units.map((unit) => (
                      <CommandItem
                        key={unit.id}
                        // value={unit.id}
                        onSelect={(value) => {
                          if (! selectedUnits.find(u => u.id === unit.id)) {                            setSelectedUnits([...selectedUnits, unit]);
                            const newUnits = [...selectedUnits, unit.id]
                            setSelectedUnits(newUnits)
                            onValueChange(newUnits);
                          }
                          setOpen(false);
                        }}
                      >
                       {unit.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-wrap items-center gap-4 p-2 rounded-xl">
        {courses.reduce((acc, { units }) => [...acc, ...units], [])
        .filter(unit => selectedUnits.includes(unit.id)).map(({id, name}) => (
            <Badge key={id}>
              {name}
              <span
                className="rounded-full bg-red-500"
                onClick={() => {
                  const newUnits = [...selectedUnits.filter(u_id => u_id !== id)]
                  setSelectedUnits(newUnits)
                  onValueChange(newUnits);
                }}
              >
                <XIcon className="h-4 w-auto" />
              </span>
            </Badge>
          ))}
          </div>
      </div>
    </div>
  );
}

const DepartmentInput = React.memo(({ departments, ...props }) => {
  console.log({departments})
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

const LecturerInput = React.memo(({ lecturers, ...props }) => {
  return (
    <Select name="faculties" {...props}>
      <SelectTrigger id="faulties" className="w-full">
        <SelectValue placeholder="Select lecturer" />
      </SelectTrigger>
      <SelectContent>
        { lecturers?.length > 0
          && lecturers.map((l, i) => <SelectItem value={String(l.id)} key={i}>{l.email}</SelectItem>)
          || <p>No Lecturers</p>
        }
      </SelectContent>
    </Select>
  )
});

const FacultyInput = React.memo(({ faculties, ...props }) => {
  // console.log(props)
  return (
    <Select name="faculties"  {...props}>
      <SelectTrigger id="faculties" className="w-full">
        <SelectValue placeholder="Select faculty..." />
      </SelectTrigger>
      <SelectContent>
        {/* <SelectItem value={null}><span className="flex flex-row gap-2"><PlusIcon />Create New Faculty</span></SelectItem> */}
        { faculties?.length > 0
          && faculties.map((f, i) => <SelectItem value={String(f.id)} key={i}>{f.name}</SelectItem>)
          || <p>No Faculties</p>
        }
      </SelectContent>
    </Select>
  )
});
