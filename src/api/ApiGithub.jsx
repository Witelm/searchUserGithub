import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.github.com/`,
  }),
  endpoints: (builder) => ({
    searchUsersApiAsc: builder.query({
      query: (user) =>
        `search/users?q=${user}&sort=repositories&order=asc&per_page=100`,
    }),
    searchUsersApiDesc: builder.query({
      query: (user) =>
        `search/users?q=${user}&sort=repositories&order=desc&per_page=100`,
    }),
    getById: builder.query({
      query: (id) => {
        return {
          url: `/user/${id}`,
        };
      },
    }),
  }),
});
export const {
  useSearchUsersApiAscQuery,
  useSearchUsersApiDescQuery,
  useGetByIdQuery,
} = githubApi;
