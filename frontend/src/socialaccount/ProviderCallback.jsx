import { Navigate, useLocation, Link } from "react-router-dom";
import { URLs, pathForPendingFlow, useAuthStatus } from "@/features/auth";

export default function ProviderCallback() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const error = params.get("error");
  const [auth, status] = useAuthStatus();

  let url = URLs.LOGIN_URL;
  if (status.isAuthenticated) {
    url = URLs.LOGIN_REDIRECT_URL;
  } else {
    url = pathForPendingFlow(auth) || url;
  }
  if (!error) {
    return <Navigate to={url} />;
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-xl">
        <h1>Third-Party Login Failure</h1>
        <p>Something went wrong.</p>
        <Link to={url}>Continue</Link>
      </div>
    </div>
  );
}
