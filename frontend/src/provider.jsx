import { QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./auth";
import { queryClient } from "./lib/client";

export default function Provider({ children }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}
