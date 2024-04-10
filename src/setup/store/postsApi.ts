import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./middleware/verification";
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
    updatePost : builder.mutation({
      query: (body) => ({
        url: "/",
        method: "PUT",
        body: body,
      }),
    }),
    getPosts: builder.query<any, void>({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
    }),
   getPostBySlug: builder.query<any, string>({
      query: (slug) => ({
        url: `/find?slug=${slug}`,
        method: "GET",
      }),
    })
    ,
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
  useCreatePostMutation,useUpdatePostMutation, useGetPostBySlugQuery
} = postsApi;
