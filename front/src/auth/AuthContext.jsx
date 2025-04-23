import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, createContext, useState } from "react";
import { getAuth, getConfig } from "./lib/allauth";

export const AuthContext = createContext(null);

function Loading() {
  // export function SkeletonDemo() {
  return (
    <div className="flex flex-col gap-y-8 h-screen w-full items-center justify-center">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
        <div className="flex items-center justify-center">
          <p className="text-gray-400 text-2xl">Loading...</p>
        </div>
    </div>
  );
  // }

  // return <div>Starting...</div>;
}

function LoadingError() {
  return <div>Loading error!</div>;
}

export function AuthContextProvider(props) {
  const [auth, setAuth] = useState(undefined);
  const [config, setConfig] = useState(undefined);

  useEffect(() => {
    function onAuthChanged(e) {
      setAuth((auth) => {
        if (typeof auth === "undefined") {
          console.log("Authentication status loaded");
        } else {
          console.log("Authentication status updated");
        }
        return e.detail;
      });
      console.log("auth:", auth);
    }

    document.addEventListener("allauth.auth.change", onAuthChanged);
    getAuth()
      .then((data) => setAuth(data))
      .catch((e) => {
        console.error(e);
        setAuth(false);
      });
    getConfig()
      .then((data) => setConfig(data))
      .catch((e) => {
        console.error(e);
      });
    return () => {
      document.removeEventListener("allauth.auth.change", onAuthChanged);
    };
  }, []);
  const loading = typeof auth === "undefined" || config?.status !== 200;
  
  return (
    <AuthContext.Provider value={{ auth, config }}>
      {loading ? (
        <Loading />
      ) : auth === false ? (
        <LoadingError />
      ) : (
        props.children
      )}
    </AuthContext.Provider>
  );
}
