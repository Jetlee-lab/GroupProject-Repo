import { apiClient } from "./client";

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
