import { useState } from "react";
import FormErrors from "@/components/form-errors";
import { requestPasswordReset, Flows } from "@/features/auth/lib/allauth";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderIcon, CircleCheck } from "lucide-react";
import { toast } from "sonner";

export default function RequestPasswordReset() {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState({ fetching: false, content: null });

  function submit() {
    setResponse({ ...response, fetching: true });
    requestPasswordReset(email)
      .then((content) => {
        setResponse((r) => {
          return { ...r, content };
        });
      })
      .catch((e) => {
        console.error(e);
        // window.alert(e);
        if (e.status !== 200) {
          toast(
            <span className="font-bold text-white">
              Error Changing your password
            </span>,
            {
              description: e.errors?.map((e, i) => (
                <span key={i}>{e.message}</span>
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
      })
      .then(() => {
        setResponse((r) => {
          return { ...r, fetching: false };
        });
      });
  }

  if (response.content?.status === 401) {
    return <Navigate to="/account/password/reset/confirm" />;
  }
  if (response.content?.status === 200) {
    return (
      <div className="w-full max-w-sm md:max-w-xl">
        <Card className="overflow-hidden">
          <CardContent className="flex flex-col gap-6 items-center text-center">
            <h1 className="flex flex-row gap-4 text-2xl font-bold">
              <CircleCheck size={28} stroke="green" />
              Reset Password{" "}
            </h1>
            <p className="font-semibold">
              A password reset has been sent to your email.
            </p>
            <Link to="/">
              <Button>Back to home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="w-full max-w-sm md:max-w-xl">
      <Card className="overflow-hidden">
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Reset Password</h1>
            <p>
              Remember your password?{" "}
              <Link to="/account/login" className="text-blue-400">
                Back to login.
              </Link>
            </p>
          </div>
          <FormErrors errors={response.content?.errors} />

          <div className="flex gap-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button disabled={response.fetching} onClick={() => submit()}>
            {(response.fetching && <LoaderIcon className="animate-spin" />) ||
              "Reset"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
