import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { logout } from "../auth/lib/allauth";
import { Button } from "@/components/ui/button";
// import Button from '../components/Button'

export default function Logout() {
  const [response, setResponse] = useState({ fetching: false, content: null });
  const navigate = useNavigate();

  function submit() {
    setResponse({ ...response, fetching: true });
    logout()
      .then((content) => {
        setResponse((r) => {
          return { ...r, content };
        });
      })
      .catch((e) => {
        console.error(e);
        // window.alert(e);
      })
      .then(() => {
        setResponse((r) => {
          return { ...r, fetching: false };
        });
      });
  }
  if (response.content) {
    return <Navigate to="/" />;
  }
  return (
    // <div className="flex flex-col items-center justify-center gap-6 h-screen">
    <div className="flex justify-around items-center align-baseline space-x-1 my-4">
      <h1 className="text-xl font-bold">Sure to Logout?</h1>
      {/* <p className="text-gray-500">Please wait...</p> */}
      <Button
        type="submit"
        size="sm"
        className="px-3"
        onClick={submit}
      >
        Yes, Log me Out <LogOut />
      </Button>
    </div>
  );
}
