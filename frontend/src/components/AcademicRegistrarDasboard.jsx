import React, { useState, useEffect, lazy } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import IssueStats from "./issues/IssueStats";
import ActivityFeed from "./issues/ActivityFeed";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchRoles, fetchTokens, createToken } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { use } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import IssueTable from "./issues/issue-table";
// import { useQuery } from "@/hooks"
// import { useQuery } from "@tanstack/react-query";
// import { fetchIssues, fetchUsers, fetchStats } from "@/lib/api";
const UnknownError = lazy(() => import("@/pages/unknown-error"));
// import { IssueStats } from "@/components/stats"

export default function RegistrarDashboard({ stats, issues, users }) {
  // const {
  //   isLoading: issuesLoading,
  //   isFetching: issuesFetching,
  //   error: issuesError,
  //   data: issuesData,
  // } = useQuery(fetchIssues);
  // const {
  //   isLoading: userssLoading,
  //   isFetching: usersFetching,
  //   error: usersError,
  //   data: usersData,
  // } = useQuery(fetchUsers);

  // return <>Result</>

  // const stats = statsRes.data;
  // const issues = issuesRes.data
  // const users = usersRes.data;

  return (
    <div className="flex flex-col gap-y-8 p-4 rounded-lg">
      {/* Overview section */}
      <div className="">
        <IssueStats stats={stats} />
      </div>

      {/* Issues Table */}
      <div className="my-4">
        <h3 className="text-xl text-center font-bold">MANAGEMENT</h3>
        {/* <IssuesTable issues={issues} users={users} /> */}

        {/* Button to Registrar Reports Page */}

        <div className="flex flex-row gap-x-4 my-8 text-left">
          <div>
            <GenerateToken />
          </div>
          <Link to="generated-tokens">
            <Button
              variant="outline"
              className="bg-blue-500 text-white px-2 py-4 rounded hover:bg-blue-600"
            >
              View Generated Tokens
            </Button>
          </Link>
          <Link to="management/courses">
            <Button
              variant="outline"
              className="bg-blue-500 text-white px-2 py-4 rounded hover:bg-blue-600"
            >
              Course Management
            </Button>
          </Link>
          <Link to="registrar-reports">
            <Button
              variant="outline"
              className="bg-blue-500 text-white px-2 py-4 rounded hover:bg-blue-600"
            >
              View & Assign Issues
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-y-8 p-4 rounded-lg">
        <div>
          <IssueTable />
        </div>
        <ActivityFeed />
      </div>
    </div>
  );
}

export function GenerateToken() {
  const [formData, setFormData] = useState({
    email: "",
    role: "",
    is_used: false,
    active: true,
  });
  const [toastShown, setToastShown] = useState(false);
  const {
    isPending: rolesPending,
    error: rolesError,
    data: roles,
    isFetching: rolesFetching,
  } = useQuery({
    queryKey: ["auth", "roles"],
    queryFn: () => fetchRoles(),
  });
  const tokenMutation = useMutation({
    mutationFn: createToken,
  });

  // const isGenerating = tokenMutation.isIdle || tokenMutation.isPending;

  function handleChange(e) {
    const { name, value } = e.target || {};
    // console.log({ name, value, arguments });
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const [copiedText, copy] = useCopyToClipboard();
  useEffect(() => {
    if (tokenMutation.isError) {
      const {
        error: { response },
      } = tokenMutation;
      const errors = [
        ...Object.entries(response?.data?.error || {}).map(([, value]) => {
          return value;
        }),
      ];
      // console.log("Error", { xxxx: response.data, response, errors });
      toast(
        <span className="font-bold text-white">Error Generating Token</span>,
        {
          description: errors.map((e, i) => (
            <span key={i}>{e.message || e}</span>
          )),
          action: {
            label: "OK",
          },
          style: {
            background: "red",
          },
        }
      );
    }
  }, [tokenMutation.isError]);

  function submit(e) {
    e.preventDefault();

    tokenMutation.mutate(formData);
  }

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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Generate Token
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Reference token</DialogTitle>
          <DialogDescription>
            For use with sign up. Click Generate when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* <form className="flex flex-col gap-y-8 p-6 md:p-8" onSubmit={submit}> */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              // value={formData.email}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right"></Label>
            {/* <Input id="username" value="@peduarte" className="col-span-3" /> */}
            <Select
              onValueChange={(value) =>
                setFormData((prevData) => ({
                  ...prevData,
                  role: value,
                }))
              }
            >
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  {((rolesError || rolesFetching || rolesPending) && <></>) ||
                    roles.data?.map((role) => (
                      <SelectItem key={role.id} value={`${role.id}`}>
                        {role.display}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* </form> */}
          {tokenMutation.isSuccess && (
            <>
              <Alert>
                {/* <Terminal className="h-4 w-4" /> */}
                <AlertTitle>Reference Token!</AlertTitle>
                <AlertDescription>
                  <span className="font-bold text-md items-center">
                    {tokenMutation.data.data?.token}
                  </span>
                </AlertDescription>
              </Alert>
              <Button onClick={handleCopy(tokenMutation.data.data?.token)}>
                Copy
              </Button>
            </>
          )}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={tokenMutation.isPending}
            onClick={submit}
          >
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
