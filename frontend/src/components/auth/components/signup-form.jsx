import { useState } from "react";
import { signUp } from "@/features/auth/lib/allauth";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useConfig } from "@/features/auth";
import AitsLogo from "@/components/images/logo2.jpg";
import { cn } from "@/lib/utils";
import { LoaderIcon, Eye, EyeOff } from "lucide-react";

export function SignupForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [token, setToken] = useState("");
  const [password2Errors, setPassword2Errors] = useState([]);
  const [response, setResponse] = useState({ fetching: false, content: null });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const config = useConfig();
  const hasProviders = config.data.socialaccount?.providers?.length > 0;

  // Function to validate passwords
  function validatePasswords(password1, password2) {
    if (password1.length < 8) {
      return { param: "password1", message: "Password must be at least 8 characters long." };
    }
    if (password1 !== password2) {
      return { param: "password2", message: "Passwords do not match." };
    }
    return null;
  }

  // Submit handler
  function submit(e) {
    e.preventDefault();

    // Validate passwords
    const validationError = validatePasswords(password1, password2);
    if (validationError) {
      setPassword2Errors([validationError]);
      return;
    }

    setPassword2Errors([]);
    setResponse({ ...response, fetching: true });

    signUp({ email, username, token, password: password1 })
      .then((content) => {
        setResponse((r) => ({ ...r, content }));
      })
      .catch((e) => {
        console.error("Signup Error:", e);
      })
      .finally(() => {
        setResponse((r) => ({ ...r, fetching: false }));
      });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="relative hidden bg-white md:block">
            <Link to="/">
              <img
                src={AitsLogo}
                alt="AITS Logo"
                className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
              />
            </Link>
          </div>
          <form className="p-6 md:p-8" onSubmit={submit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create an Account</h1>
                <p className="mt-2 text-balance text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    to="/account/login"
                    className="text-blue-400 underline underline-offset-4"
                  >
                    Login here.
                  </Link>
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormErrors param="email" errors={response.content?.errors || []} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
                <FormErrors param="username" errors={response.content?.errors || []} />
              </div>
              <div className="md:flex gap-4 md:items-center">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    required
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                  <FormErrors param="password" errors={response.content?.errors || []} />
                </div>
                <div className="relative">
                  <Label htmlFor="password2">Repeat Password</Label>
                  <Input
                    id="password2"
                    type={passwordVisible ? "text" : "password"}
                    required
                    onChange={(e) => setPassword1(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-1 top-4 right-3 flex items-center text-muted-foreground"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <FormErrors param="password2" errors={password2Errors} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="token">Reference Token</Label>
                <Input
                  id="token"
                  type="text"
                  required
                  onChange={(e) => setToken(e.target.value)}
                />
                <FormErrors param="token" errors={response.content?.errors || []} />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={response.fetching}
              >
                {response.fetching ? <LoaderIcon className="animate-spin" /> : "Sign Up"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

export function FormErrors({ param, errors }) {
  if (!errors || !errors.length) return null;

  const filteredErrors = errors.filter((error) =>
    param ? error.param === param : error.param == null
  );

  if (!filteredErrors.length) return null;

  return (
    <ul className="text-red-600 text-sm">
      {filteredErrors.map((e, i) => (
        <li key={i}>{e.message}</li>
      ))}
    </ul>
  );
}

export { SignupForm as default };