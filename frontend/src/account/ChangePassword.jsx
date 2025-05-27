import { useState } from "react";
import FormErrors from "@/components/form-errors";
import { changePassword } from "@/features/auth/lib/allauth";
import { Navigate } from "react-router-dom";
import { useUser } from "@/features/auth/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderIcon, Eye, EyeOff, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ChangePassword() {
  const hasCurrentPassword = useUser().has_usable_password;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [newPassword2Errors, setNewPassword2Errors] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [response, setResponse] = useState({ fetching: false, content: null });

  function submit(e) {
    e.preventDefault();
    console.log({ currentPassword, newPassword, newPassword2 });
    if (newPassword !== newPassword2) {
      setNewPassword2Errors([
        { param: "new-password2", message: "Passwords do not match." },
      ]);
      return;
    }
    setNewPassword2Errors([]);
    setResponse({ ...response, fetching: true });
    changePassword({
      current_password: currentPassword,
      new_password: newPassword,
    })
      .then((resp) => {
        setResponse((r) => {
          return { ...r, content: resp };
        });
        toast(
          <span className="font-bold text-green-600">
            Password changed successfully
          </span>
        );
      })
      .catch((e) => {
        console.error("catch", e);
        window.alert(e);
      })
      .then(() => {
        setResponse((r) => {
          return { ...r, fetching: false };
        });
      });
  }
  if (response.content?.status === 200) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="w-full max-w-sm md:max-w-xl">
      <Card className="overflow-hidden">
        <CardContent className="">
          <form className="p-6 md:p-8" onSubmit={submit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="flex gap-4 text-2xl font-bold">
                  <Lock size={28} strokeWidth={4} stroke="orange" />
                  {hasCurrentPassword ? "Change Password" : "Set Password"}
                </h1>
                <p className="mt-2 text-balance text-muted-foreground">
                  {hasCurrentPassword
                    ? "Enter your current password, followed by your new password."
                    : "You currently have no password set. Enter your (new) password."}
                </p>
              </div>
              <div className="md:flex gap-4 md:items-center">
                {hasCurrentPassword ? (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="password">Current Password</Label>
                    <Input
                      id="password"
                      autoComplete="password"
                      placeholder="Current password"
                      type={passwordVisible ? "text" : "password"}
                      required
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    {response.fetching || (
                      <FormErrors
                        param="password"
                        errors={response.content?.errors}
                      />
                    )}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col gap-2 relative">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="new-password"
                    autoComplete="new-password"
                    placeholder="New password"
                    type={passwordVisible ? "text" : "password"}
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-1 top-8 md:top-6 right-3 flex items-center text-muted-foreground"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {response.fetching || (
                    <FormErrors
                      param="new-password"
                      errors={newPassword2Errors}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2 relative">
                  <Label htmlFor="password">New Password (again)</Label>
                  <Input
                    id="new-password2"
                    autoComplete="new-password"
                    placeholder="Repeat new password"
                    type={passwordVisible ? "text" : "password"}
                    required
                    onChange={(e) => setNewPassword2(e.target.value)}
                  />
                  {response.fetching || (
                    <FormErrors
                      param="new-password2"
                      errors={newPassword2Errors}
                    />
                  )}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={response.fetching}
              >
                {(response.fetching && (
                  <LoaderIcon className="animate-spin" />
                )) ||
                  (hasCurrentPassword ? "Change" : "Set")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
