import { apiClient } from "./client";
import { request } from "@/auth/lib/allauth";
import { getCSRFToken } from "@/auth/lib/django";
import { API_URL } from "./constants";

/*
 *  Issues API
 */
export const fetchIssues = async (id) => {
  const url = id === undefined ? "/issues" : `/issuses/${id}`;
  return await apiClient.get(url).then((response) => {
    return response.data;
  });
};

export const fetchIssue = async (id) => {
  return fetchIssues(id);
};

export const createIssue = async (issue) => {
  return await apiClient.post("/issues", issue).then((response) => {
    return response.data;
  });
};

export const fetchStats = async ({ stat, params }) => {
  console.log({params})
  const url = stat === undefined ? "/stats" : `/stats/${stat}`
  return await apiClient.get(url, { params }).then((response) => {
    return response.data;
  });
};

/*
 *  Users API
 */
export const fetchUsers = async () => {
  return await apiClient.get("/users").then((response) => {
    return response.data;
  });
};

export const fetchRoles = async () => {
  return await apiClient.get("/users/roles").then((response) => {
    return response.data;
  });
};

export const createToken = async (data) => {
  console.log({POST: data})
  return await apiClient.post("/reference-token", data, {
    withCredentials: true,
    headers: {
      "X-CSRFToken": getCSRFToken(),
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.data;
  });
};
// export async function createToken (data) {
//   return await request('POST', "/reference-token", data)
// }

export const fetchTokens = async () => {
  return await apiClient.get("/reference-token").then((response) => {
    return response.data;
  });
}

export const fetchToken = async (id) => {
  return await apiClient.get(`/reference-token/${id}`).then((response) => {
    return response.data;
  });
};
