import { apiClient } from "./client";
import { request } from "@/features/auth/lib/allauth";
import { getCSRFToken } from "@/features/auth/lib/django";
import { API_URL } from "./constants";

// export const paginatedQuery = (
//   queryFn,
//   { page, size},
//   ...args
// ) => {
//   return queryFn(...args, {params: paginate(page, size)});
// };

export const paginate = (page, size = 10) => ({
  limit: size,
  offset: page * size,
});

/*
 *  Issues API
 */
export const fetchIssues = async ({ id, params } = {}) => {
  const url = id === undefined ? "/issues" : `/issuses/${id}`;
  return await apiClient.get(url, { params }).then((response) => {
    console.log({...params,data:response.data.data})
    return response.data;
  });
};

export const fetchIssuesMeta = async ({ params } = {}) => {
  return await apiClient.get("/issues/meta", { params }).then((response) => {
    return response.data;
  });
};

export const fetchIssue = async (id) => {
  return fetchIssues({ id });
};

export const createIssue = async (issue) => {
  return await apiClient
    .post("/issues", issue, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    });
};

export const updateIssue = async (issue) => {
  return await apiClient.put(`/issues/${issue.id}`, issue).then((response) => {
    return response.data;
  });
};

export const deleteIssue = async (id) => {
  return await apiClient.delete(`/issues/${id}`).then((response) => {
    return response.data;
  });
};

export const searchIssue = async (search) => {
  const searchParams = new URLSearchParams(search).toString();
  const qp = searchParams ? `?${searchParams}` : "";
  return apiClient.get(`/search${qp}`).then((response) => response.data);
};

export const fetchStats = async ({ stat, params }) => {
  // console.log({params})
  const url = stat === undefined ? "/stats" : `/stats/${stat}`;
  return await apiClient.get(url, { params }).then((response) => response.data);
};

/*
 *  Users API
 */
export const fetchUsers = async ({ endpoint, params } = {}) => {
  const url = endpoint === undefined ? "/users" : `/users/${endpoint}`;
  return await apiClient.get(url, { params }).then((response) => {
    return response.data;
  });
};

export const fetchRoles = async () => {
  return await apiClient.get("/users/roles").then((response) => {
    return response.data;
  });
};

export const createToken = async (data) => {
  // console.log({POST: data})
  return await apiClient
    .post("/reference-token", data, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCSRFToken(),
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
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
};

export const fetchToken = async (id) => {
  return await apiClient.get(`/reference-token/${id}`).then((response) => {
    return response.data;
  });
};
