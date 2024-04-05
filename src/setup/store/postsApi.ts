import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./middleware/verification";
import { HOST } from "../../keys";
import { BlogItem } from "../../components/blogs/BlogCard";

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
    getPosts: builder.query<BlogItem[], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
   getPostById: builder.query<BlogItem, number>({
      query: (id) => ({
        url: `/${id}`,
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
  useCreatePostMutation,useUpdatePostMutation, useGetPostByIdQuery
} = postsApi;
