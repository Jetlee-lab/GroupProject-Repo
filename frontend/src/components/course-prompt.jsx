import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderIcon, Eye, EyeOff, Lock, BookLock } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { enrollToCourses, fetchCourses } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { formatDuration } from "date-fns";
import { MultiSelect } from "./muti-select";

import ChangePassword from "@/account/ChangePassword";

const CoursePrompt = ({ userId, isOpen, onCourseEnrolled }) => {
  // const isOpen = true;
  const [courses, setCourses] = useState([])
  const [response, setResponse] = useState({ fetching: false, content: null });
  const {
    isPending: coursesPending,
    error: coursesError,
    data: coursesRes,
    isFetching: coursesFetching,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: () => fetchCourses(),
  });
  const coursesList = coursesRes?.data.map(({id, name, duration}) => (
    {
      value: id,
      // label: `${name} - ${formatDuration({weeks: duration})}`
      label: name,
    }
  )) || [];
  console.log({coursesList})

  function submit(e) {
    e.preventDefault();

    setResponse({ ...response, fetching: true });
    enrollToCourses(
      {studentId: userId, courses}
    )
      .then((resp) => {
        setResponse((r) => {
          return { ...r, content: resp };
        });
        toast(
          <span className="font-bold text-green-600">
            Enrolled successfully
          </span>
        );
        onCourseEnrolled(courses)
      })
      .catch((e) => {
        console.error("courseEnrollment", e);
      })
      .then(() => {
        setResponse((r) => {
          return { ...r, fetching: false };
        });
      });
  }

  return (
    <div
      className="transition-all text-black"
    >
        <Dialog open={isOpen}>
          <DialogTrigger asChild>
            {/* <Link to="/account/password/change"> */}
              <Button variant="outline" className="hidden mb-2 bg-blue-500 text-white p-4 cursor-pointer rounded hover:bg-blue-600"
              //  onClick={setOpen(true)}
              >
                Enroll to Courses
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
                                Course Enrollment
                              </h1>
                              <p className="mt-2 text-balance text-lg">
                                You seem not to have enrolled to any courses yet, follow bellow for enrollment!
                              </p>
                            </div>
                              <div className="flex flex-col gap-2 items-center mt-4">
                                <Label htmlFor="password" className="font-bold">Select Course</Label>
                                <MultiSelect
                                  options={coursesList}
                                  onValueChange={setCourses}
                                  defaultValue={courses}
                                  placeholder="Select Courses"
                                  variant="inverted"
                                  animation={2}
                                  maxCount={3}
                                />
                              </div>
                            <Button
                              type="submit"
                              className="w-full"
                              disabled={response.fetching || !courses.length}
                            >
                              {(response.fetching && (
                                <LoaderIcon className="animate-spin" />
                              )) ||
                                "Enroll Now"}
                            </Button>
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
    </div>
  );
};

export default CoursePrompt;
