// Import utility function for conditional class names
import { cn } from "@/lib/utils";

// Import reusable UI components
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Import static image for the logo
import AitsLogo from "@/components/images/logo2.jpg";

// Import React hooks for state management
import { useState } from "react";

// Import custom hooks and functions for authentication
import { useConfig } from "@/features/auth";
import { login } from "@/features/auth/lib/allauth";

// Import routing and notification libraries
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Import icon for loading spinner
import { LoaderIcon } from "lucide-react";

// Define the LoginForm component
export function LoginForm({ className, ...props }) {
  // State variables for email, password, and response
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState({ fetching: false, content: null });

  // Fetch configuration for social login providers
  const config = useConfig();
  const hasProviders = config.data.socialaccount?.providers?.length > 0;

  // Function to handle form submission
  function submit(e) {
    e.preventDefault(); // Prevent default form submission behavior
    setResponse({ ...response, fetching: true }); // Set fetching state to true

    // Call the login function with email and password
    login({ email, password })
      .then((content) => {
        setResponse((r) => {
          return { ...r, content }; // Update response content
        });

        // Handle login errors
        if (content.status !== 200) {
          toast(
            <span className="font-bold text-white">Error Logging In</span>,
            {
              description: content.errors?.map((e, i) => (
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
      .catch((e) => {
        console.error("LoginError", { e }); // Log any errors
      })
      .then(() => {
        setResponse((r) => {
          return { ...r, fetching: false }; // Reset fetching state
        });
      });
  }

  // Render the login form
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Card container for the login form */}
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Left side: Logo */}
          <div className="relative hidden bg-white md:block">
            <Link to="/">
              <img
                src={AitsLogo}
                alt="Image"
                className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
              />
            </Link>
          </div>

          {/* Right side: Login form */}
          <form className="p-6 md:p-8" onSubmit={submit}>
            <div className="flex flex-col gap-6">
              {/* Welcome message */}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your AITS account
                </p>
              </div>

              {/* Email input */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password input */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full"
                disabled={response.fetching}
              >
                {response.fetching && <LoaderIcon className="animate-spin" /> || "Login"}
              </Button>

              {/* Divider for social login */}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              {/* Social login buttons */}
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" className="w-full">
                  {/* Apple login icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04..."
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Apple</span>
                </Button>
                <Button variant="outline" className="w-full">
                  {/* Google login icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187..."
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>
                <Button variant="outline" className="w-full">
                  {/* Meta login icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113..."
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Meta</span>
                </Button>
              </div>

              {/* Sign-up link */}
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to="/account/signup"
                  className="underline underline-offset-4"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Terms of Service and Privacy Policy */}
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

// Export the LoginForm component as the default export
export { LoginForm as default };