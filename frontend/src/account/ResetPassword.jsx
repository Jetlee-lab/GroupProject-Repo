import { useState } from "react";
import FormErrors from "@/components/form-errors";
import { getPasswordReset, resetPassword } from "@/features/auth/lib/allauth";
import { Navigate, Link, useLocation, useLoaderData } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderIcon, CircleCheck, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export async function resetPasswordByLinkLoader({ params }) {
  const key = params.key;
  const resp = await getPasswordReset(key);
  return { resetKey: key, resetKeyResponse: resp };
}

function ResetPassword({ resetKey, resetKeyResponse }) {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [password2Errors, setPassword2Errors] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [response, setResponse] = useState({ fetching: false, content: null });

  function submit() {
    if (password2 !== password1) {
      setPassword2Errors([
        { param: "new-password2", message: "Passwords does not match." },
      ]);
      return;
    }
    setPassword2Errors([]);
    setResponse({ ...response, fetching: true });
    resetPassword({ key: resetKey, password: password1 })
      .then((resp) => {
        setResponse((r) => {
          return { ...r, content: resp };
        });
        toast(<span className="text-green-600 font-bold">"Password changed. Login to continue!"</span>)
      })
      .catch((e) => {
        console.error(e);
        window.alert(e);
      })
      .then(() => {
        setResponse((r) => {
          return { ...r, fetching: false };
        });
      });
  }

  if ([200, 401].includes(response.content?.status)) {
    return <Navigate to="/account/login" />;
  }
  let body;
  if (resetKeyResponse.status !== 200) {
    body = <FormErrors param="key" errors={resetKeyResponse.errors} />;
  } else if (response.content?.errors?.filter((e) => e.param === "key")) {
    body = <FormErrors param="key" errors={response.content?.errors} />;
  } else {
    body = (
      <>
        <div className="flex gap-2 relative">
          <Label htmlFor="new-password" className="text-left">
            New Password
          </Label>
          <Input
            id="new-password"
            autoComplete="new-password"
            placeholder="New password"
            type={passwordVisible ? "text" : "password"}
            required
            onChange={(e) => setPassword1(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-1 top-1 right-3 flex items-center text-muted-foreground"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {/* <FormErrors param="new-password" errors={response.content?.errors} /> */}
        </div>
        <div className="flex gap-2 relative">
          <Label htmlFor="new-password2" className="text-left">
            New Password (again)
          </Label>
          <Input
            id="new-password2"
            placeholder="Repeat new password"
            type={passwordVisible ? "text" : "password"}
            required
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <FormErrors param="new-password2" errors={password2Errors} />
        <Button disabled={response.fetching} onClick={() => submit()}>
          {(response.fetching && <LoaderIcon className="animate-spin" />) ||
            "Reset"}
        </Button>
      </>
    );
  }

  return (
    <div className="w-full max-w-sm md:max-w-xl">
      <Card className="overflow-hidden">
        <CardContent className="flex flex-col gap-6 items-center text-center">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Reset Password</h1>
            <p>
              Remember your password?{" "}
              <Link to="/account/login" className="text-blue-400">
                Back to login.
              </Link>
            </p>
          </div>
          {body}
        </CardContent>
      </Card>
    </div>
  );
}

export function ResetPasswordByLink() {
  const { resetKey, resetKeyResponse } = useLoaderData();
  return (
    <ResetPassword resetKey={resetKey} resetKeyResponse={resetKeyResponse} />
  );
}

export function ResetPasswordByCode() {
  const { state } = useLocation();
  if (!state || !state.resetKey || !state.resetKeyResponse) {
    return <Navigate to="/account/password/reset" />;
  }
  return (
    <ResetPassword
      resetKey={state.resetKey}
      resetKeyResponse={state.resetKeyResponse}
    />
  );
}
