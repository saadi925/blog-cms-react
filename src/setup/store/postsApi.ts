import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./middleware/verification";
import { BlogType } from "./slices/dataSlice";
import { HOST } from "../../keys";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${HOST}/posts`,
    prepareHeaders: prepareHeaders,
  }),
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body: body,
      }),
    }),
    getPosts: builder.query<BlogType[], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    deletePosts: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useDeletePostsMutation,
  useCreatePostMutation,
} = postsApi;
