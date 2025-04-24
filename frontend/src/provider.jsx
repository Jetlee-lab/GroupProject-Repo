import { QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "@/features/auth";
import { queryClient } from "./lib/client";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function AppProvider({ children }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </QueryClientProvider>
    </Provider>
  );
}
