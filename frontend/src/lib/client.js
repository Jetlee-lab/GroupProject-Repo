import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import { API_URL } from "./constants";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const queryClient = new QueryClient()

export { apiClient, queryClient };
